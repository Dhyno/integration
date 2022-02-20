import { createContext, useReducer } from "react";

export const ProductContext = createContext();

const initialState = {
  topingCount: 0,
  userOrder: [],
};

const reducer = (state, action) => {

  switch (action.type) {
    case "ADD_TOPPING":
        return{ ...state, topingCount: state.topingCount + 1 }
    case "DELETE_TOPPING":
        return{ ...state, topingCount: state.topingCount - 1 }
    case "RESET_TOPPING":
      return {...state, topingCount: 0}
    // case "ADD_ORDER":
    //   return{ ...state, userOrder: }
    default:
      throw new Error();
  }
};

export const ProductContextProvider = ({ children }) => {
  const [productState, dispatchProduct] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={[productState, dispatchProduct]}>
      {children}
    </ProductContext.Provider>
  );
};