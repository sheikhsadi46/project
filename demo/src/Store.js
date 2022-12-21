import { createContext, useReducer } from 'react';
export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    paymentAddress:  {},
      paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: [],
  },
  tdx: {
    tdxItems: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
      case 'ADD_TDX':
      // add to cart
      const newItem1 = action.payload;
      const existItem1 = state.tdx.tdxItems.find(
        (item1) => item1._id === newItem1._id
      );
      const tdxItems = existItem1
        ? state.tdx.tdxItems.map((item1) =>
            item1._id === existItem1._id ? newItem1 : item1
          )
        : [...state.tdx.tdxItems, newItem1];
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, tdx: { ...state.tdx, tdxItems } };
    // case 'CART_REMOVE_ITEM': {
    //   const cartItems = state.cart.cartItems.filter(
    //     (item) => item._id !== action.payload._id
    //   );
    //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }
    // case 'CART_CLEAR':
    //   return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload };
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          tdxItems: [],
          paymentAddress: {},
          paymentMethod: '',
        },
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentAddress: action.payload,
        },
      };
      case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}