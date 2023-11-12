// import React,{useState,useEffect} from 'react'
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import {Button} from '@mui/material'
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addItemsToCart , showCartItems, removeItemsFromCart} from '../../actions/cartActions';


// const CartItem = ({item, deleteCartItem, decreaseQuantity,emptyAllCart, increaseQuantity, grossTotal, setGross, gross}) => {

//     const [qty, setQty] = useState(item.quantity);
//     const handleMinus = ()=>{
//         if(qty === 1){
//             setQty(0)
//             // decreaseQuantity(item.productId, qty - 1)
//             // setGross(0)
//             removeItem();
//         }
//         else{
//             setQty(qty - 1)  
//             decreaseQuantity(item.productId, qty - 1)
//             qty > 0 ? setGross(grossTotal - item.price) : setGross(0);
//         }
//         // qty > 0 ?  setQty(qty - 1) : setQty(0);
        
//     }
//     const handleAdd = ()=> {
//         qty < item.stock ?  setQty(qty + 1) : setQty(item.stock);
//         increaseQuantity(item.productId, qty + 1, item.stock)
//         qty < item.stock ? setGross(grossTotal + item.price) : setGross(grossTotal);
//     }
//     const removeItem = () => {
//         deleteCartItem(item.productId)
       
//     }
//     const emptyCart = () => {
//       emptyAllCart();
//     }

//     useEffect(()=>{
//         setGross(gross)
//        }, [])

//   return (
//     <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
//             {/* <Link to = {`/product/${item.productId}`}>{item.name}</Link> */}

//           <div className="flex w-2/5">

//             <div className="w-24">
//               <img className="h-14" src={item.imageUrl || require('../Browse/education.png')} alt="item"/>
//             </div>

//             <div className="flex flex-col justify-between ml-4 flex-grow">
//             <Link to = {`/product/${item.productId}`}> 
//               <span  className="font-bold text-sm no-underline">{item.name}</span>
//               </Link>
//               <span className="text-red-500 text-xs">{item.category}</span>
//               <span onClick={removeItem} className="font-semibold hover:text-red-500 hover:cursor-pointer text-gray-500 text-xs">Remove</span>
//             </div>
//           </div>

//           <div className="flex justify-center w-1/5">
//             <Button onClick={handleMinus}>{<RemoveIcon/>}</Button>
//             <input className="mx-2 border text-center w-8" type="text" readOnly value={qty}/>
//             <Button onClick={handleAdd}>{<AddIcon/>}</Button>
//           </div>

//           <span className="text-center w-1/5 font-semibold text-sm">${item.price}</span>
//           <span className="text-center w-1/5 font-semibold text-sm">${item.price * qty}</span>
//         </div>

//   )
// }

// export default CartItem


// CartItem.js

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
