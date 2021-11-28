import { FETCH_PRODUCTS } from "../actionType";

const initialState = {
    products:[]
}

export const productReducer = (state=initialState,action) =>{
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {...state,products:action.payload}
    
        default:
            return state;
    }
}