// // Dependencies
// import * as React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
// import Steps from './Steps'
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
// import {createOrder, emailConfirmation} from '../../actions/orderActions'
// import {PAYMENT_SUCCESS} from "../../constants/cartConstants"
// import { removeAnEntireCartForAUser } from '../../actions/cartActions';
// import MetaData from '../../MetaData';

// const SquarePayment = () => {
//   const {completion, shippingInfo, gross, cartItems } = useSelector(state => state.cart);
//   const {singleOrder} = useSelector(state=>state.orderRed)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [paymentInfo, setPayInfo] = React.useState({});
//   const [paidAt, setPaidAt] = React.useState(Date);
//   useEffect(()=>{
//     if (completion){

//     }
//   }, [completion])
//   return(  
//   <>
//   <MetaData title = "Payment"/>
//   <div className='grid justify-center items-center h-[100vh]'>
//     <Steps activeSteps={1}/>

//   <PaymentForm
//     /**
//      * Identifies the calling form with a verified application ID generated from
//      * the Square Application Dashboard.
//      */
//     applicationId="sandbox-sq0idb-jQrWxIXS9ESZ97B4CoGMQA"
//     /**
//      * Invoked when payment form receives the result of a tokenize generation
//      * request. The result will be a valid credit card or wallet token, or an error.
//      */
//     cardTokenizeResponseReceived={async (token, buyer) => {
//       let body = JSON.stringify({
//         sourceId: token.token
//       });
//       const paymentResponse = await fetch('http://localhost:4000/api/v1/pay', {
//         method: 'POST',
//         credentials: "include",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body,
//       });

//       if (paymentResponse.ok) {
          
//           const data = paymentResponse.json();
//           data.then(result => {

//             dispatch(createOrder(shippingInfo, result.paymentRes.paymentInfo, result.paymentRes.paidAt ))
//             dispatch(emailConfirmation());
//             dispatch(removeAnEntireCartForAUser());
//             navigate("/confirmation");
//             dispatch({
//               type: PAYMENT_SUCCESS,  
//             })
//           })
        
//         return data;
//       }
//       else{

//         navigate("/cart")
//       }

//     }}
    
    
    
//     // 
//     /**
//      * Identifies the location of the merchant that is taking the payment.
//      * Obtained from the Square Application Dashboard - Locations tab.
//      */
//     locationId="LVC7ACBMGXHJZ"
//   >
//     <CreditCard />
//   </PaymentForm>
//   </div>
//   </>
//   )
// };

// export default SquarePayment;