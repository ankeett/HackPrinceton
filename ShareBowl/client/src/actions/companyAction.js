import {LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST
    , REGISTER_SUCCESS, LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL, LOGOUT_FAIL, LOGOUT_SUCCESS
    ,UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET,
    CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_RESET,
    FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS ,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    ACTIVATE_SUCCESS, ACTIVATE_FAIL, ACTIVATE_REQUEST
} from "../constants/userConstants";
import axios from 'axios';
const host = `http://localhost:4000`;

//REGISTER
export const registerCompany = (name, email, password,phoneNumber,lat,long,websiteUrl) => async(dispatch) => {
    try {
        dispatch({type:REGISTER_REQUEST}); 
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true}; 
        const {data} = await axios.post(
            `${host}/api/v1/company/register`,
            {name,email, password,phoneNumber,lat,long,websiteUrl},
            config
        )
        await axios.post(
            `http://localhost:4000/api/v1/company/account/sendactivate`,
            {email},
            config
        )
        dispatch({type:REGISTER_SUCCESS, payload:data.user})
    } catch (error) {
        dispatch({type:REGISTER_FAIL, payload:error.response.data.error});
    }
}




export const activateCompany = (token) => async(dispatch)=>{
    try {
        dispatch({type:ACTIVATE_REQUEST});
        const {data} = await axios.put(
            `${host}/api/v1/company/account/activate/${token}`,
        )

        dispatch({type:ACTIVATE_SUCCESS, payload:data.user});


    } catch (error) {
        dispatch({type:ACTIVATE_FAIL,payload:error.response.data.error });
    }
}

//LOGIN
export const loginCompany = (email, password) => async(dispatch)=>{
    try {
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        const {data} = await axios.post(
            `${host}/api/v1/company/login`,
            {email, password},
            config,
           
        )

        dispatch({type:LOGIN_SUCCESS, payload:data.user})
    } catch (error) {
        dispatch({type:LOGIN_FAIL, payload:error.response.data.error});
    }
}

// LOGOUT
export const logoutCompany = () => async(dispatch) => {
    try {
        const config = {  withCredentials: true};
        await axios.get(`${host}/api/v1/company/logout`, config);
        dispatch({type:LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type:LOGOUT_FAIL, payload:error.response.data.error});
    }
}



export const clearErrors = ()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}


export const forgotPasswordCompany = (email) => async (dispatch)=> {
    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});
        const config = {headers:{"Content-type":"application/json"}};
        const {data} = await axios.post(`${host}/api/v1/company/password/forgot`, {email}, config);
        dispatch({type:FORGOT_PASSWORD_SUCCESS, payload:data.message});
    } catch (error) {

        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.error
        })
        
    }
}

export const resetPasswordCompany = (token, password) => async (dispatch)=> {
    try {
        dispatch({type:RESET_PASSWORD_REQUEST});
        const config = {headers:{"Content-type":"application/json"}};
        
        const {data} = await axios.put(`${host}/api/v1/company/password/reset/${token}`, {password}, config);
        dispatch({type:RESET_PASSWORD_SUCCESS, payload:data.success});
    } catch (error) {
        dispatch({
            type:RESET_PASSWORD_FAIL,
            payload:error.response.data.error
        })        
    }
}


export const changePasswordCompany = (prevpassword, newpassword)=>async(dispatch)=>{
    try {
        dispatch({type:CHANGE_PASSWORD_REQUEST});
        const config = {headers:{"Content-type":"application/json"},  withCredentials: true};
        
        const {data} = await axios.put(
            `${host}/v1/company/changePassword`,
            {prevpassword, newpassword},
            config
        );

        dispatch({type:CHANGE_PASSWORD_SUCCESS, payload:data.success});
        
    } catch (error) {
        dispatch({type:CHANGE_PASSWORD_FAIL, payload:error.response.data.error})
    }
}

export const loadUserCompany = () => async (dispatch, getState) => {
    try{
       
    dispatch({type:LOAD_REQUEST});
    const config = {withCredentials: true};
    const {data} = await axios.get(`${host}/api/v1/company/me`, config);
    dispatch({type:LOAD_SUCCESS, payload:data.user});
    }catch (error){
        dispatch({type:LOAD_FAIL, payload:error.response.data.error});
    }
}
