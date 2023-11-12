import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Container, Paper } from '@mui/material';
import { fetchAProduct } from '../../actions/productAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from '@mui/material';
import MetaData from '../../MetaData';


const ConfirmRegistration = () => {
    const { cartItems, gross, cartLoading } = useSelector((state) => state.cart);

    const {isLoading, error, success, product} = useSelector(state=>state.productRed);
    
    const params = useParams();
    const dispatch = useDispatch();


    return (
        <div>
            <MetaData title = "Confirmation"/>
            <Container component="main" maxWidth='xs'>
        <Paper elevation={3} className="flex-col align-middle p-10">
            <h2>Confirmation Page</h2>
            <Divider className='m-2'/>
            {
                cartItems && cartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                ))
            }
            </Paper>
            </Container>
        </div>
    );
}

export default ConfirmRegistration;
