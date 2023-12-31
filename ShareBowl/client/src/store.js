import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import { userReducer, forgotPasswordReducer, reviewReducer } from './reducers/userReducer';
import {productReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer';
import { orderReducer } from './reducers/orderReducer';
const reducer = combineReducers({
    user:userReducer,
    forgotPw: forgotPasswordReducer,
    review:reviewReducer,
    productRed:productReducer,
    cart:cartReducer,
    orderRed:orderReducer

});

let initialState = {
   
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;