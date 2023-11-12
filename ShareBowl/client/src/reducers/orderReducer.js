import { FETCH_ORDERS_REQUEST,CREATE_ORDER_SUCCESS, FETCH_ORDERS_SUCCESS,FETCH_ORDERS_FAIL, UPDATE_ORDERS_FAIL,UPDATE_ORDERS_REQUEST,UPDATE_ORDERS_SUCCESS} from "../constants/orderConstants";

export const orderReducer = (state={order:[], singleOrder : {}},action)=>{
    switch(action.type){

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                singleOrder:action.payload.order,
                order:action.payload.orders
            }
        case FETCH_ORDERS_REQUEST:
            return {
              ...state,
              isLoading:true,
            
            }
            case FETCH_ORDERS_SUCCESS:
            return {
              ...state,
              isLoading:false,
              order:action.payload.orders,
              success:action.payload.success,
              count:action.payload.ordersForCount.length
            }
          case FETCH_ORDERS_FAIL:
            return {
              ...state,
              isLoading:false,
              error:action.payload,
              success:false

            }
            case UPDATE_ORDERS_FAIL:
                return{
                    ...state,
                    error:true,
                    isUpdating:false,
                }
            case UPDATE_ORDERS_REQUEST:
                return{
                    ...state,
                    isUpdating: true,
                }
            case UPDATE_ORDERS_SUCCESS:
                return{
                    ...state,
                    isUpdating:false,
                    success:action.payload.success,
                }

            default:
         return state

    }
}