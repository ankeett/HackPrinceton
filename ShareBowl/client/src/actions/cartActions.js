import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_CART,
    UPDATE_CART,
    SAVE_SHIPPING_INFO,
    SHOW_CART_ITEMS,
    SHOW_CART_ITEMS_FAIL,
    SHOW_CART_ITEMS_REQUEST,
    CLEAR_ERRORS
}from "../constants/cartConstants"

import axios from "axios";
const host = `http://localhost:4000`;

//this function will do two things
//one if the product is not in the cart then it is gonna create a new cart
//else it is going to update the existing product in the cart
export const addItemsToCart = (productId, quantity, reload = false) => async (dispatch)=>{
    const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
    //get product detail
    const {data} = await axios.get(`${host}/api/v1/product/detail/${productId}`)
    //check if the cart already exists
    //we can do that by checking for the product
    //if productId is in cart then it exists
    const existingCart = await axios.get(`${host}/api/v1/user/cart/get/${productId}`, {withCredentials:true});
    //update
    if (existingCart.data.cart){ 
        const updatedCart = await axios.put(
            `${host}/api/v1/user/cart/update/${productId}`,
            {quantity},
            config
        )
            if (reload){
                window.location.replace("/confirm")

            }
        dispatch({
            type:UPDATE_CART,
            payload:{
                product:{
                    product:data.product._id,
                    name:data.product.name,
                    price:data.product.price,
                    // image:data.product.images[0].url,
                    stock:data.product.stock,
                    quantity,
                },
                carts:updatedCart.data.carts,
                gross:updatedCart.data.gross
            }
        })
    }
    //create
    else{
        const newCart  = await axios.post(
            `${host}/api/v1/user/cart/add`,
            {productId, quantity},
            config
        )
        if (reload){
            window.location.replace("/confirm")

        }
        dispatch({
            type:ADD_TO_CART,
            payload:{
                product:{
                    product:data.product._id,
                    name:data.product.name,
                    price:data.product.price,
                    stock:data.product.stock,
                    quantity,
                },
                carts:newCart.data.carts,
                gross:newCart.data.gross
            }
        })
    }
}
//show cart items
export const showCartItems = () => async(dispatch) => {
    try {
        dispatch({
            type:SHOW_CART_ITEMS_REQUEST
        })
        const {data} = await axios.get(`${host}/api/v1/user/cart/all`, {withCredentials:true});
        const carts = data.carts;

        const gross = data.gross;
        dispatch({
            type:SHOW_CART_ITEMS,
            payload:{
                carts,
                gross
            }
            
        })
    } catch (error) {
        dispatch({
            type:SHOW_CART_ITEMS_FAIL
        })
    }
}



export const removeItemsFromCart = (productId) => async(dispatch)=>{

    const {data} = await axios.delete(`${host}/api/v1/user/cart/delete/${productId}`, {withCredentials:true});

    dispatch({
        type:REMOVE_FROM_CART,
        payload:{
            productId:productId,
            gross:data.gross,
            carts:data.carts
        }
    })
    
}

export const removeAnEntireCartForAUser = () => async(dispatch)=>{
    const data = await axios.delete(`${host}/api/v1/user/cart/deleteAll`, {withCredentials:true});
    dispatch({
        type:REMOVE_CART,
    })
}



export const clearErrors = ()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}

