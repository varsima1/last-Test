import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios'
const ShoppingCardContext = createContext();

export const ShoppingCardProvider = ({ children }) => {
  const initialState = [];

  const {userObject} = useAuth()
  const shoppingCardReducer = (state, action) => {
    switch (action.type) {
      case 'ALL':
        return [...state, ...action.payload];
      case 'ADD_TO_CARD':
        return [...state, action.payload];
      case 'REMOVE_FROM_CARD':
        return state.filter((item) => item._id !== action.payload);
      default:
        return state;
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:8181/cards');
        dispatch({type: "ALL", payload:
        response.data.filter(item => item.likes.includes(userObject._id))});
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    if(userObject)
      fetchCards();
  }, [userObject]);

  const [shoppingCard, dispatch] = useReducer(shoppingCardReducer, initialState);

  const addToCard = (item) => {
    dispatch({ type: 'ADD_TO_CARD', payload: item });
  };

  const removeFromCard = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CARD', payload: itemId });
  };

  return (
    <ShoppingCardContext.Provider value={{ shoppingCard, addToCard, removeFromCard }}>
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