import {
    CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL,
    FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAIL,
    FETCH_A_PRODUCT_REQUEST, FETCH_A_PRODUCT_SUCCESS, FETCH_A_PRODUCT_FAIL,
    UPDATE_A_PRODUCT_REQUEST, UPDATE_A_PRODUCT_SUCCESS, UPDATE_A_PRODUCT_FAIL,
    DELETE_A_PRODUCT_REQUEST, DELETE_A_PRODUCT_SUCCESS, DELETE_A_PRODUCT_FAIL,
    CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL,
    GET_PRODUCT_REVIEWS_REQUEST, GET_PRODUCT_REVIEWS_SUCCESS, GET_PRODUCT_REVIEWS_FAIL, CLEAR_ERRORS

} from "../constants/productConstants";
import {CREATE_ORDER_SUCCESS, FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS,FETCH_ORDERS_FAIL,UPDATE_ORDERS_FAIL,UPDATE_ORDERS_REQUEST,UPDATE_ORDERS_SUCCESS } from "../constants/orderConstants";
import axios from "axios";
const host = `http://localhost:4000`;


export const createOrder = () => async (dispatch) => {
    try {
        console.log('here in action');

        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};


        const newOrder = await axios.post(`${host}/api/v1/order/create`, config);

        // Maybe you can navigate to the order confirmation from here
        console.log('here in action 2');
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: newOrder.data,
        });

        console.log('here in action 3');
    } catch (error) {
        console.log(error);
        // You might want to dispatch an error action here if needed
    }
};


export const emailConfirmation = () => async (dispatch) => {
        //send email activation
        const config = {withCredentials: true};
        const email = await axios.get(`${host}/api/v1/order/sendConfirmation`, config)

}

export const showAllInventory = (currentPage)=>async(dispatch)=>{
    try{
        dispatch({type:FETCH_PRODUCTS_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        console.log("here")

        const {data} = await axios.post(
            `${host}/api/v1/product/list/me`,{currentPage},config
        )
        dispatch({type:FETCH_PRODUCTS_SUCCESS, payload:data})
       

    }
    catch(error){
        dispatch({
            type:FETCH_PRODUCTS_FAIL,
            payload:error,
        })
    }
}

export const showOrders = (currentPage)=>async(dispatch)=>{
    try{
        dispatch({type:FETCH_ORDERS_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        console.log("here in acion")
        const {data} = await axios.post(
            `${host}/api/v1/order/all`,{currentPage}, config
        )
        console.log(data)
        dispatch({type:FETCH_ORDERS_SUCCESS, payload:data})
    }
    catch(error){
        console.log(error);
        dispatch({
            type:FETCH_ORDERS_FAIL,
            payload:error.response.data.error,
        })
    }
}

//for a user
export const showMyOrders = (currentPage) => async(dispatch)=>{
    try{
        dispatch({type:FETCH_ORDERS_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.post(
            `${host}/api/v1/order/my/all`, {currentPage},config
        )
        console.log(data)
        dispatch({type:FETCH_ORDERS_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({
            type:FETCH_ORDERS_FAIL,
            payload:error.response.data.error,
        })
    }
}

export const updateOrder=(id,status)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_ORDERS_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.post(
            `${host}/api/v1/order/update/${id}`,{status}, config
        )
        dispatch({type:UPDATE_ORDERS_SUCCESS,payload:data})

    }
    catch(error){
        dispatch({
            type:UPDATE_ORDERS_FAIL,
        })
    }
}

