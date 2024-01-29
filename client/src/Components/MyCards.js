import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaShoppingBasket } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import './scss/Market/market.scss';
import ErrorPage from './ErrorPage';
import withLoader from './loader/withLoader';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';


function MyCards() {
  const { token, userObject } = useAuth();
  const [myCards, setMyCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [editCardId, setEditCardId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = ({ term, category }) => {
    setSearchTerm(term);
    setSelectedCategory(category);
  };

  const handleSort = (order) => {
    let sortedCards;

    switch (order) {
      case 'asc':
        sortedCards = [...cards].sort((a, b) => a.price - b.price);
        break;
      case 'desc':
        sortedCards = [...cards].sort((a, b) => b.price - a.price);
        break;
      case 'priceHigh':
        sortedCards = [...cards].sort((a, b) => b.price - a.price);
        break;
      case 'priceLow':
        sortedCards = [...cards].sort((a, b) => a.price - b.price);
        break;
      default:
        sortedCards = cards;
        break;
    }

    setCards(sortedCards);
  };

  const fetchMyCards = async () => {
    try {
      if (userObject) {
        const response = await axios.get(`http://localhost:8181/cards/my-cards`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setMyCards(response.data);
        setCards(response.data); // Update cards for sorting and searching
      }
    } catch (error) {
      console.error('Error fetching my cards:', error);
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, [token, userObject]);

  const handleEditClick = async (cardId, e) => {
    const Confirmed = window.confirm('Do you want to edit the card?');
    if (Confirmed) {
      try {
        const response = await axios.put(
          `http://localhost:8181/cards/${cardId}`,
          {
            headers: {
              'x-auth-token': token,
            },
          }
        );
        console.log('Card sent successfully');
        setEditCardId(null);
  
        if (response && response.data) {
          const updatedCard = response.data;
          setCards((prevCards) =>
            prevCards.map((prevCard) => (prevCard._id === updatedCard._id ? updatedCard : prevCard))
          );
        }
      } catch (error) {
        console.error('Error editing card:', error);
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
  };
  

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        if (userObject) {
          const response = await axios.get(`http://localhost:8181/cards/my-cards`, {
            headers: {
              'x-auth-token': token,
            },
          });
          setMyCards(response.data);
        }
      } catch (error) {
        console.error('Error fetching my cards:', error);
      }
    };

    fetchMyCards();
  }, [token, userObject]);

  const handleDeleteClick = async (cardId) => {
    const isConfirmed = window.confirm('Do you want to delete the card?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8181/cards/${cardId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log('Card deleted!');
        setMyCards((prev) =>
          prev.filter((x) => {
            if (x._id === cardId) {
              return false;
            }
            return true;
          })
        );
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };
  if (!token) {
    return <div><ErrorPage/></div>;
  }

  const filteredAndSortedCards = cards
    .filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || card.category === selectedCategory)
    );

  return (
    <div className='space'>
            <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        selectedCategory={selectedCategory}
        onSort={handleSort}
      />
      <div className="mcard-container">
      {filteredAndSortedCards.map((card) => (
          <div className="mcards" key={card._id}>
            <img className="card-image" src={card.image.url} alt={card.image.alt} />

            <p className="mcards-title">{card.title}</p>
            <p>{card.category}</p>
            <p>{card.subtitle}</p>
            <p className="mcards-description">{card.description}</p>
            <p>{card.phone}</p>
            <p className="mcards-price">
            {card.price} {card.currency}
            </p>
            {card.user_id === userObject?._id && (
              <>
                <FaTrash
                  className="trash-icon"
                  onClick={() => handleDeleteClick(card._id)}
                />
                <Link to={'/editCard/' + card._id} style={{color:'grey'}}><FaEdit className="edit-icon" onClick={(e) => handleEditClick(card._id, e)} /></Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default withLoader(MyCards);
