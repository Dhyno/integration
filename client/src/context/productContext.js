import { createContext, useReducer } from "react";

export const ProductContext = createContext();

const initialState = {
  topingCount: 0,
  totalProductPrice: 0,
};

const reducer = (state, action) => {

  switch (action.type) {
    case "ADD_TOPPING":
        return{ ...state, topingCount: state.topingCount + 1 }
    case "DELETE_TOPPING":
        return{ ...state, topingCount: state.topingCount - 1 }
    case "LOAD_PRODUCT_PRICE":
      return { ...state, totalProductPrice: state.totalProductPrice + 1}
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