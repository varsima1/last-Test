// import React from 'react';
// import { useAuth } from './AuthContext';
// import { FaTrash } from 'react-icons/fa';
// import axios from 'axios';
// import { useShoppingCard } from './ShoppingCardContext';
// import './scss/ShoppingCard/ShoppingCard.scss';

// function ShoppingCard() {
//   const { token } = useAuth();
//   const { shoppingCard, removeFromCard } = useShoppingCard();

//   const handleRemoveFromCard = async (cardId) => {
//     try {
//       await axios.patch(`http://localhost:8181/cards/${cardId}`, null, {
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       removeFromCard(cardId);

//       console.log('Item removed from the shopping cart!');
//     } catch (error) {
//       console.error('Error removing item from the shopping cart:', error);
//     }
//   };

//   return (
//       <div className='ShoppingCardContainer'>
//         <h2>Shopping Card</h2>
//         {shoppingCard.length === 0 ? (
//           <p>Your shopping card is empty.</p>
//         ) : (
//           <table className='shoppingTable'>
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Price</th>
//                 <th>Currency</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shoppingCard.map((card) => (
//                 <tr key={card._id}>
//                   <td>
//                     <img className='shoppingCardimg' src={card.image.url} alt={card.image.alt} />
//                   </td>
//                   <td>{card.title}</td>
//                   <td>{card.description}</td>
//                   <td>{card.price}</td>
//                   <td>{card.currency}</td>
//                   <td>
//                     <FaTrash style={{cursor:'pointer'}} onClick={() => handleRemoveFromCard(card._id)} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     );
// }

// export default ShoppingCard;
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useShoppingCard } from './ShoppingCardContext';
import './scss/ShoppingCard/ShoppingCard.scss';

function ShoppingCard() {
  const { token } = useAuth();
  const { shoppingCard, removeFromCard } = useShoppingCard();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [shoppingCard]);

  const calculateTotalPrice = () => {
    let total = 0;

    shoppingCard.forEach((card) => {
      // You may want to add currency conversion logic here
      total += card.price;
    });

    setTotalPrice(total);
  };

  const handleRemoveFromCard = async (cardId) => {
    try {
      await axios.patch(`http://localhost:8181/cards/${cardId}`, null, {
        headers: {
          'x-auth-token': token,
        },
      });
      removeFromCard(cardId);

      console.log('Item removed from the shopping cart!');
    } catch (error) {
      console.error('Error removing item from the shopping cart:', error);
    }
  };

  return (
    <div className='ShoppingCardContainer'>
      <h2>Shopping Card</h2>
      {shoppingCard.length === 0 ? (
        <p>Your shopping card is empty.</p>
      ) : (
        <div>
          <table className='shoppingTable'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Currency</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shoppingCard.map((card) => (
                <tr key={card._id}>
                  <td>
                    <img className='shoppingCardimg' src={card.image.url} alt={card.image.alt} />
                  </td>
                  <td>{card.title}</td>
                  <td>{card.description}</td>
                  <td>{card.price}</td>
                  <td>{card.currency}</td>
                  <td>
                    <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleRemoveFromCard(card._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Price: {totalPrice} {/* Add currency symbol here */}</p>
        </div>
      )}
    </div>
  );
}

export default ShoppingCard;
