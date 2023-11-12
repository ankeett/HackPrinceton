import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Paper } from '@mui/material';
import { fetchAProduct } from '../../actions/productAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {createOrder, emailConfirmation} from '../../actions/orderActions'
import { useNavigate } from 'react-router-dom';
import { removeAnEntireCartForAUser } from '../../actions/cartActions';
import MetaData from '../../MetaData';


const CartItem = ({ item }) => {
    const { cartItems, gross, cartLoading } = useSelector((state) => state.cart);

    const {isLoading, error, success, product} = useSelector(state=>state.productRed);
    
    const params = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchAProduct(item.productId));
    }
    , [dispatch, params.id, success]);
    
    console.log(product);

    const receiveConfirmation = () => {
        console.log("Item removed from the cart");
        dispatch(createOrder())
        dispatch(emailConfirmation());
        dispatch(removeAnEntireCartForAUser());
        navigate("/home")

    }
    

    return (
        <div key={item._id}>
            
            <h4>{item.name}</h4>
            <p>Category: {product.category}</p>
            <p> SubCategory: {product.subcategory}</p>
            <p>Description: {product.description}</p>
            <p>No of people: {item.quantity}</p>

            <div className="flex justify-center items-center">
                <Button className='text-white bg-[#658864] rounded-lg normal-case' onClick={receiveConfirmation}>
                    Confirm
                </Button>
            </div>
        </div>
    );
}

export default CartItem;
