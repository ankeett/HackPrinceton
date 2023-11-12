import {
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL,
  FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL,
  FETCH_A_PRODUCT_REQUEST, FETCH_A_PRODUCT_SUCCESS, FETCH_A_PRODUCT_FAIL,
  UPDATE_A_PRODUCT_REQUEST, UPDATE_A_PRODUCT_SUCCESS, UPDATE_A_PRODUCT_FAIL,
  DELETE_A_PRODUCT_REQUEST, DELETE_A_PRODUCT_SUCCESS, DELETE_A_PRODUCT_FAIL,
  CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL,
  GET_PRODUCT_REVIEWS_REQUEST, GET_PRODUCT_REVIEWS_SUCCESS, GET_PRODUCT_REVIEWS_FAIL

} from "../constants/productConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";



export const productReducer = (state={product:[]}, action) => {
    switch(action.type){
        case CREATE_PRODUCT_REQUEST:
          return {
            ...state,
            isLoading:true,
          }
          case CREATE_PRODUCT_SUCCESS:
            return{
              isLoading:false,
              success:action.payload.success,
              product:action.payload.product,
            }
          case CREATE_REVIEW_FAIL:
            return{
              ...state,
              success:false,
              error:action.payload,
            }
          
          case FETCH_A_PRODUCT_REQUEST:
          case FETCH_PRODUCTS_REQUEST:
            return {
              ...state,
              isLoading:true,
              isUpdated:false
            
            }

          case FETCH_A_PRODUCT_SUCCESS:
            return {
              ...state,
              isLoading:false,
              isUpdated:false,
              product:action.payload.product,
              success:action.payload.success,
            }
          case FETCH_PRODUCTS_SUCCESS:
            return {
              ...state,
              isLoading:false,
              isUpdated:false,
              product:action.payload.products,
              success:action.payload.success,
              count:action.payload.productsForCount.length,
              productLocation:action.payload.productLocation? action.payload.productLocation:[]

            }
          case FETCH_A_PRODUCT_FAIL:
          case FETCH_PRODUCTS_FAIL:
            return {
              ...state,
              error:action.payload,
              success:false,
              isLoading:false

            }

          case DELETE_A_PRODUCT_REQUEST:
            return {
              ...state,
              isDeleting:true,
            }
          case DELETE_A_PRODUCT_SUCCESS:
            return {
              ...state,
              product:action.payload.products,
              isDeleted:action.payload.success
            }

          case DELETE_A_PRODUCT_FAIL:
            return {
              ...state,
              isDeleted:false,
              error:true
            }

          case UPDATE_A_PRODUCT_REQUEST:
            return{
              ...state,
              isUpdated:false,
            }

          case UPDATE_A_PRODUCT_SUCCESS:
            return{
              ...state,
              isUpdated:true,
              product:action.payload.products
            }
          
          case UPDATE_A_PRODUCT_FAIL:
            return{
              ...state,
              isUpdated:false,
              error:action.payload
            }

          
            case CREATE_REVIEW_REQUEST:
            case DELETE_A_PRODUCT_REQUEST:
              return {
                ...state,
                isUpdated:false
              }

            case CREATE_REVIEW_SUCCESS:
            case DELETE_REVIEW_SUCCESS:
              return {
                ...state,
                isUpdated:true,
                product:action.payload.product
              }

            case CREATE_REVIEW_FAIL:
            case DELETE_REVIEW_FAIL:
              return {
                ...state,
                isUpdated:false,
                error:action.payload.error
              }
            case CLEAR_ERRORS:
              return{
                ...state,
                error:null,
              }

          
       default:
         return state
    }
}