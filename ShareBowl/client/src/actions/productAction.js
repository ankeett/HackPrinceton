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
import axios from 'axios';

import { getMyReview } from "./userActions";
const host = `http://localhost:4000`;

//CREATE A PRODUCT
export const createProduct = (name, description, category, subcategory, stock, images) => async(dispatch) => {
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.post(
            `${host}/api/v1/product/create`,
            {name, description, category, subcategory, stock, images},
            config
        )  

        window.location.replace(`/product/${data.product._id.toString()}`)
        dispatch({type:CREATE_PRODUCT_SUCCESS,
            payload:data,
        })
        
        
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}

//FETCH  ALL PRODUCTS
export const fetchProducts = (keyword = "", currentPage=1, price=[0,25000], category , ratings = 0, radius, selectedLat, selectedLong) => async(dispatch) => {
    try {
        dispatch({type:FETCH_PRODUCTS_REQUEST});

        // const {data} = await axios.get(`/api/v1/product/listAll`);

        let link = `/api/v1/product/list/${radius}/${selectedLat}/${selectedLong}?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category !== ""){
       
                link = `/api/v1/product/list/${radius}/${selectedLat}/${selectedLong}?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
                
        }    
        const {data} = await axios.get(`${host}${link}`);
        dispatch({
            type:FETCH_PRODUCTS_SUCCESS,
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:FETCH_PRODUCTS_FAIL,
            payload:error.response.data.error,
        })
    }
}


//FETCH A PRODUCT
export const fetchAProduct = (id) => async(dispatch) => {
    try {
        dispatch({
            type:FETCH_A_PRODUCT_REQUEST
        });
        const {data} = await axios.get(`${host}/api/v1/product/detail/${id}`)
        dispatch({
            type:FETCH_A_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:FETCH_A_PRODUCT_FAIL,
            payload:error,
        })
    }
}

//UPDATE PRODUCT
export const updateProduct = (id, name, description, subcategory, stock, images, newImages) => async(dispatch) => {
    try {
        dispatch({
            type:UPDATE_A_PRODUCT_REQUEST
        });
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.put(
                `${host}/api/v1/product/update/${id}`,
                {name, description, subcategory, stock, images, newImages},
                config
            );
        
            window.location.replace(`/product/${id}`);


        dispatch({
            type:UPDATE_A_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:UPDATE_A_PRODUCT_FAIL,
            payload:error.response.data.error,
        })
    }
}
//DELETE PRODUCT
export const deleteProduct = (id) => async(dispatch) => {
    try {
        const config = {withCredentials: true};   

        dispatch({
            type:DELETE_A_PRODUCT_REQUEST
        }); 
        const {data} = await axios.delete(`${host}/api/v1/product/delete/${id}`,config );
        dispatch({
            type:DELETE_A_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:DELETE_A_PRODUCT_FAIL,
            payload:error,
        })
    }
}

//CREATE REVIEW PRODUCT
export const createReview = (id,rating, comment) => async(dispatch) => {
    try {
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        dispatch({type:CREATE_REVIEW_REQUEST});
        const {data} = await axios.put(`${host}/api/v1//product/review/add/${id}`, 
            {rating, comment},
            config
        );
        dispatch(getMyReview(id));

        dispatch({
            type:CREATE_REVIEW_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:CREATE_REVIEW_FAIL,
            payload:error
        })
    }
}

//DELETE REVIEW
export const deleteMyReview = (id) => async(dispatch) => {
    try {
        dispatch({type:DELETE_REVIEW_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.delete(`${host}/api/v1/product/review/delete/${id}`, config )
        dispatch(getMyReview(id));

        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data
        })
    
        
    } catch (error) {
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error
        })
    }
}

//GET REVIEWS
export const getReviews = () => async(dispatch) => {
    try {
        
    } catch (error) {
    }
}

export const clearErrors = ()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}


