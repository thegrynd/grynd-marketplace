import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useState,
} from "react";

const INITIAL_CART = [];

const INITIAL_STATE = {
  cart: INITIAL_CART,
};
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_SAVED_ITEMS":
      return action.payload;
    case "CHANGE_CART_AMOUNT":
      let cartList = state.cart;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1) {
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        return {
          ...state,
          cart: filteredCart,
        };
      }

      // IF PRODUCT ALREADY EXISTS IN CART
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                qty: cartItem.qty,
              }
            : item
        );
        return {
          ...state,
          cart: newCart,
        };
      }

      return {
        ...state,
        cart: [...cartList, cartItem],
      };

    default: {
      return state;
    }
  }
};

// =======================================================

// =======================================================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    if (!!localStorage["GRYND_SHOPPING_CART"]) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      dispatch({
        type: "GET_SAVED_ITEMS",
        payload: JSON.parse(localStorage.getItem("GRYND_SHOPPING_CART")),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== INITIAL_STATE) {
      localStorage.setItem("GRYND_SHOPPING_CART", JSON.stringify(state));

      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
export default AppContext;
