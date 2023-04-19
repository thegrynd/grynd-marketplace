import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  useState,
} from "react";

const INITIAL_CART = [];

// const getSavedCart = () => {
//   let savedCartData =
//     typeof window !== "undefined"
//       ? localStorage.getItem("GRYND_SHOPPING_CART")
//       : false;

//   if (savedCartData === []) {
//     return INITIAL_CART;
//   } else {
//     return JSON.parse(savedCartData);
//   }
// };

const INITIAL_STATE = {
  cart: INITIAL_CART,
};
const AppContext = createContext({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
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
    case "SET_ITEMS": {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

// =======================================================

// =======================================================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  // const [ savedCartData, setSavedCardData] = useState(false)

  // useEffect(() => setSavedCardData(localStorage.getItem("GRYND_SHOPPING_CART")), [])

  // useEffect(() => {
  //   localStorage.setItem("GRYND_SHOPPING_CART", JSON.stringify(state.cart));
  // }, [state.cart]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("GRYND_SHOPPING_CART"))) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      dispatch({
        type: "SET_ITEMS",
        payload: JSON.parse(localStorage.getItem("GRYND_SHOPPING_CART")),
      });

      // return state.cart;
    }
  }, []);

  useEffect(() => {
    // if (state !== INITIAL_STATE) {
    localStorage.setItem("GRYND_SHOPPING_CART", JSON.stringify(state.cart));

    //create and/or set a new localstorage variable called "state"
    // }
  }, [state.cart]);

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
