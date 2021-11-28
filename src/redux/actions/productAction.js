import { FETCH_PRODUCTS } from "../actionType"

export const fetchAllProducts = (products) =>{
    // console.log("Product is ",products);
    // dispatch({ type: FETCH_PRODUCTS, payload: products });
    return{
        type:FETCH_PRODUCTS,
        payload:products,
    }
  };
