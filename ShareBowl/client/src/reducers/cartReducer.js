
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_INFO,
    UPDATE_CART,
    SHOW_CART_ITEMS,
    SHOW_CART_ITEMS_REQUEST,
    SHOW_CART_ITEMS_FAIL,
    CLEAR_ERRORS,
    PAYMENT_SUCCESS,
    REMOVE_CART
}from "../constants/cartConstants"


export const cartReducer = (state = {cartItems:[],gross:0, shippingInfo:{},cartLoading:false, completion:false}, action)=>{
    switch(action.type)
    {
        case ADD_TO_CART:
        
            const item = action.payload.product;                
            return {
                    ...state,
                    // cartItems:[...state.cartItems, item],
                    cartItems:action.payload.carts,
                    gross:action.payload.gross,
            }
            
        case UPDATE_CART:
            const itemToUpdate = action.payload.product;
            return {
                ...state,
                // cartItems:state.cartItems.map((i)=>{
                //     return i.product ===  itemToUpdate.product? itemToUpdate:i
                // }),
                cartItems:action.payload.carts,
                gross:action.payload.gross
            }
        
        case SHOW_CART_ITEMS_REQUEST:
            return {
                ...state,
                cartLoading:true
            }
        case SHOW_CART_ITEMS:
            return {
                ...state,
                cartItems:[...state.cartItems, ...action.payload.carts],
                gross:action.payload.gross,
                cartLoading:false
        }

        case SHOW_CART_ITEMS_FAIL:
            return {
                cartItems:[],
                gross:0,
                cartLoading:false,
                error:true
            }
    
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems:action.payload.carts,
                gross:action.payload.gross
            }
        case REMOVE_CART:
            return {
                ...state,
                cartItems:[],
                gross:0,
                shippingInfo:{},
                completion:false
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload,
            }
        case PAYMENT_SUCCESS:
            return {
                ...state,
                completion:true
            }
        case CLEAR_ERRORS:
            return{
            ...state,
            error:null,
            }
        default:
            return state;

      
    }
}