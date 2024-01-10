import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaShoppingBasket } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import './scss/Market/market.scss';
function MyCards() {
  const { token, userObject } = useAuth();
  const [myCards, setMyCards] = useState([]);

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        if (userObject) {
          // Update the axios request to include the correct endpoint
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
        // Notify the parent component that the card is deleted
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

  return (
    <div className='space'>
      <div className="mcard-container">
        {myCards.map((card) => (
          <div className="mcards" key={card._id}>
            {/* Render each card as needed */}
            <img className="card-image" src={card.image.url} alt={card.image.alt} />

            <p className="mcards-title">{card.title}</p>
            <p>{card.category}</p>
            <p>{card.subtitle}</p>
            <p className="mcards-description">{card.description}</p>
            <p>{card.phone}</p>
            <p className="mcards-price">
            {card.price} {card.currency}
            </p>
            {/* Conditionally render the icons */}
            {card.user_id === userObject?._id && (
              <>
                <FaTrash
                  className="trash-icon"
                  onClick={() => handleDeleteClick(card._id)}
                />
                <FaEdit className="edit-icon" />
              </>
            )}
            <FaShoppingBasket className="shop-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyCards;
