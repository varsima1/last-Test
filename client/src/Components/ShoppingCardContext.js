import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useForceUpdate } from './useForceUpdate';

const ShoppingCardContext = createContext();

export const ShoppingCardProvider = ({ children }) => {
  const initialState = [];
  const forceUpdate = useForceUpdate();

  const { userObject } = useAuth();

  const shoppingCardReducer = (state, action) => {
    switch (action.type) {
      case 'ALL':
        return action.payload;
      case 'ADD_TO_CARD':
        return [...state, { ...action.payload, count: 1 }];
      case 'REMOVE_FROM_CARD':
        return state.filter((item) => item._id !== action.payload);
      case 'UPDATE_ITEM_COUNT':
        return state.map((item) =>
          item._id === action.payload.cardId
            ? { ...item, count: Math.max((item.count || 0) + action.payload.delta, 1) }
            : item
        );
      default:
        return state;
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8181/cards');

        if(userObject) {
          dispatch({
            type: 'ALL',
            payload: response.data.filter((item) => {
              if (userObject._id) {
                return item.likes.includes(userObject._id);
              } else {
                // return true if card is in sessionstorage
                return true;
              }
            })
          });
        }else {
          const sessionCart = JSON.parse(sessionStorage.getItem('shoppingItems')) || [];
          console.log(sessionCart)
          dispatch({
            type: 'ALL',
            payload:  Array.from(new Set(response.data.filter((item) => sessionCart.includes(item._id))))})
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, [userObject,sessionStorage]);
// usecallback
// sweetalert

  const [shoppingCard, dispatch] = useReducer(shoppingCardReducer, initialState);

  const addToCard = (item) => {
    dispatch({ type: 'ADD_TO_CARD', payload: item });
  };

  const removeFromCard = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CARD', payload: itemId });
  };

  const updateItemCount = (cardId, delta) => {
    dispatch({ type: 'UPDATE_ITEM_COUNT', payload: { cardId, delta } });
  };

  return (
    <ShoppingCardContext.Provider value={{ shoppingCard, addToCard, removeFromCard, updateItemCount }}>
      {children}
    </ShoppingCardContext.Provider>
  );
};

export const useShoppingCard = () => {
  const context = useContext(ShoppingCardContext);
  if (!context) {
    throw new Error('useShoppingCard must be used within a ShoppingCardProvider');
  }
  return context;
};
