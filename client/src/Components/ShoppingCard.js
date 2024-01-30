import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useShoppingCard } from './ShoppingCardContext';
import './scss/ShoppingCard/ShoppingCard.scss';
import { Button } from 'react-bootstrap';
import withLoader from './loader/withLoader';
import { useForceUpdate } from './useForceUpdate';

function ShoppingCard() {
  const { token } = useAuth();
  const { shoppingCard, removeFromCard, updateItemCount } = useShoppingCard();
  const [totalPrice, setTotalPrice] = useState(0);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    calculateTotalPrice();
  }, [shoppingCard]);
  

  const calculateTotalPrice = () => {
    let total = 0;
  
    shoppingCard.forEach((card) => {
      const cardCount = isNaN(card.count) ? 0 : card.count;
      const cardPrice = isNaN(card.price) ? 0 : card.price;
  
      total += cardPrice * cardCount;
    });
  
    setTotalPrice(total);
  };

  const handleRemoveFromCard = async (cardId) => {
    try {
      console.log('Token:', token);
      await axios.patch(`http://localhost:8181/cards/${cardId}`, null, {
        headers: {
          'x-auth-token': token,
        },
      });
      removeFromCard(cardId);
      console.log('Item removed from the shopping card!');
      forceUpdate();
    } catch (error) {
      console.error('Error removing item from the shopping card:', error);
    }
  };




  const handleIncreaseItemCount = (cardId) => {
    // Increase item count
    updateItemCount(cardId, 1);
  };


  
  const handleDecreaseItemCount = (cardId, count) => {
    // If count is less than or equal to 1, prompt for deletion
    if (count <= 1) {
      const confirmDelete = window.confirm('Do you want to delete this item?');

      if (confirmDelete) {
        handleRemoveFromCard(cardId);
      }
    } else {
      // Decrease item count
      updateItemCount(cardId, -1);
    }
  };
  const handleBuyNow = () => {
    if (token) {
      // Check if total price is greater than 0
      if (totalPrice > 0) {
        alert(`Congratulations! You bought the item with a total price of ${totalPrice} .`);
      } else {
        alert('Please add items to the shopping card before buying.');
      }
    } else {
      alert('Please create an account to buy an item.');
    }
  };
  return (
    <div className='ShoppingCardContainer'>
      {shoppingCard.length === 0 ? (
        <p>Your shopping card is empty.</p>
      ) : (
        <div>
          <table className='shoppingTable'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>$/€</th>
                <th>Count</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {shoppingCard.map((card) => (
                <tr key={card._id}>
                  <td>
                    <img className='shoppingCardimg' src={card.image.url} alt={card.image.alt} />
                  </td>
                  <td>{card.title}</td>
                  <td>{card.price}</td>
                  <td>{card.currency}</td>
                  <td>
                    <Button variant="outline-secondary" onClick={() => handleDecreaseItemCount(card._id, card.count)}>
                      -
                    </Button>{' '}
                    {card.count}{' '}
                    <Button variant="outline-secondary" onClick={() => handleIncreaseItemCount(card._id)}>
                      +
                    </Button>
                  </td>
                  <td>
                    <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleRemoveFromCard(card._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleBuyNow}>Buy Now</Button>
          <p>Total Price: {totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default withLoader(ShoppingCard);

