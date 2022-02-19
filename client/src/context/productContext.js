import { createContext,useReducer } from "react";

export const ProductContext= createContext();

const initialState={
    toppingCount: 0
}

const reducer = () => {
    return console.log('test');
}

export const ProductContextProvider = ( {children} ) => { 
    const [state,dispatchProduct] = useReducer(reducer,initialState);

    return(
        <ProductContext.Provider value={[state,dispatchProduct]} >
            {children}
        </ProductContext.Provider>
    )
}