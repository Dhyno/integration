import { createContext, useReducer } from "react";

export const ProductContext = createContext();

const initialState = {
  topingCount: 0,
  productPrice: 0
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TOPPING":
        return{ ...state, topingCount: state.topingCount + 1 }
    case "DELETE_TOPPING":
        return{ ...state, topingCount: state.topingCount - 1 }
    case "LOAD_PRODUCT_PRICE":
        return console.log(payload)
    
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