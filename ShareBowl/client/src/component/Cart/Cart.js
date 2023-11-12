// import React,{useEffect,useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Button, TextField,MenuItem} from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import { addItemsToCart, removeItemsFromCart, removeAnEntireCartForAUser} from '../../actions/cartActions';
// import CartItem from './CartItem';
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
// import InstantMessage from '../Error/InstantError';
// import {clearErrors} from '../../actions/cartActions';
// import MetaData from '../../MetaData';


// import Loading from '../Loader/loading';

// const Cart = () => {
//   const {error, isLoading, isAuthenticated, user } = useSelector(state => state.user);
//   console.log(error)
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const {cartItems, gross, cartLoading} = useSelector((state)=>state.cart);
//     console.log(cartItems)
//     const [grossTotal, setGross] = useState();
//     const [carts, setCarts] = useState([]);
//     const [hasErrors, setHasErrors]= useState("");
//     const [helperText, setHelperText] = useState("");

 
//     useEffect(()=>{
//       if (error){
//         setHasErrors(error);
//         dispatch(clearErrors());
//       }
//     }, [isAuthenticated, user, dispatch, error])
    
//     const increaseQuantity = (id, quantity, stock)=>{
//       if (stock < quantity){
//           return;
//       }
//       dispatch(addItemsToCart(id, quantity));
//     }

//     const decreaseQuantity = (id, quantity )=>{
//       if (0>quantity){
//           // deleteCartItem(id);
//           return
//       }
//       dispatch(addItemsToCart(id, quantity));
//     }
//     const deleteCartItem = (id) => {
//       dispatch(removeItemsFromCart(id));
//       // alert.success("Item removed from the cart")
//     }

//     const emptyAllCart = () => {
//       dispatch(removeAnEntireCartForAUser());
//     }
//     const checkOutHandler = ()=>{
//       // navigate("/login?redirect=/shipping");
//       navigate("/shipping")
//     }

//     const ship = [
//       {
//         value: 'Standard Shipping',
        
//       },
//       {
//         value: 'Express Shipping',
       
//       },
//     ];

//   return (
//     <>
//    <MetaData title = "Cart"/>
// <div className="bg-gray-100">
//   <div className="container mx-auto mt-10">
//     <div className="flex shadow-md my-10">
//       <div className="w-3/4 bg-white px-10 py-10">
//         <div className="flex justify-between border-b pb-8 font-semibold text-2xl">
//           <h1>Shopping Cart</h1>
//           <h2>{cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}</h2>
//         </div>

//         <div className="flex mt-10 mb-5">
//           <h2 className="font-semibold text-gray-600 text-xs w-2/5">Product Details</h2>
//           <h2 className="font-semibold text-center text-gray-600 text-xs w-1/5">Quantity</h2>
//           {/* <h2 className="font-semibold text-center text-gray-600 text-xs w-1/5">Price</h2> */}
//           <h2 className="font-semibold text-center text-gray-600 text-xs w-1/5">Total</h2>
//         </div>

//         {/* {cartLoading || isLoading? <Loading/> : 


        
//         cartItems?.length > 0 ? cartItems.map((item)=>(
//           <CartItem 
//             key = {item._id}
//             item = {item}
//             deleteCartItem = {deleteCartItem} 
//             decreaseQuantity = {decreaseQuantity}
//             emptyAllCart = {emptyAllCart}
//             increaseQuantity = {increaseQuantity}
//             grossTotal = {grossTotal}
//             setGross = {setGross}
//             gross = {gross}
//            />
//         ))
//         : <div className='mt-[150px] flex flex-col items-center justify-center'>
//           <RemoveShoppingCartIcon fontSize='large' className='scale-[4]'/>
//           <h3 className='mt-[50px]'>No Items in your Cart</h3>
//           <Button onClick={()=>{navigate('/buy')}} size='large' className='text-white bg-[#658864] rounded-lg normal-case'>View Products</Button>

//           </div>

//       } */}
//       </div>

//       <div id="summary" className="w-1/4 px-8 py-10">
//         <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
//         <div className="flex justify-between mt-10 mb-5">
//           <span className="font-semibold text-sm uppercase">{cartItems.length} {cartItems.length > 1 ? "Items" : "Item"} </span>
//           <span className="font-semibold text-sm">${gross.toFixed(2)}</span>
//         </div>
//         <div>
//           <label className="font-medium inline-block mb-2 text-sm uppercase pl-2">Shipping</label>
//           <TextField select className="p-2 text-sm" fullWidth defaultValue="Standard Shipping" size='small'>
//           {ship.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               {option.value}
//             </MenuItem>
//           ))}
//           </TextField>
//         </div>
//         <div className="p-2">
//           <label htmlFor="promo" className="font-medium inline-block mt-3 mb-3 text-sm uppercase">Promo Code</label>
//           <TextField  helperText={helperText} type="text" size="small" id="promo" placeholder="Enter your code" className="border-blue bg-white text-sm" fullWidth/>
//           <Button onClick={()=>{setHelperText("Invalid Promo Code")}} className="mt-4 text-white bg-red-700 normal-case">Apply</Button>
//         </div>
//         <div className="border-t mt-8">
//           <div className="flex font-semibold justify-between py-6 text-sm uppercase">
//             <span>Total cost</span>
//             <span>${gross.toFixed(2)}</span>
//           </div>
//           <Button onClick={checkOutHandler} disabled = {cartItems.length < 1 ? true:false} fullWidth className='text-white bg-[#658864] rounded-lg normal-case'>Checkout</Button>
//         </div>
//       </div>

//     </div>
//   </div>
// </div>
// {
//       hasErrors ?  <InstantMessage severity= "error" message = {hasErrors} /> : ''
//     }
// </>

//   )
// }

// export default Cart