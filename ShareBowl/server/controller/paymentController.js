// const ErrorHandler = require("../utils/errorHandler.js");
// const uuidv4 = require('uuid4');
// const { paymentsApi } = require("../square.connect.js");

// const Cart = require("../models/cartModel");



// /*
// If you examine the code carefully, you’ll notice a key called idempotencyKey. This is a requirement that prevents 
// a user from making duplicate transactions; no transaction can have more than one idempotencyKey.
// */
// exports.payForProduct = async(req, res, next) => {
//     try {
//         //first of all get the cart of the user to determine the total price
//         const carts = await Cart.find({userId:req.user.id});
//         const gross = carts.reduce(
//             (acc, item)=>acc + item.quantity * item.price, 0
//         )
//         let body = req.body;
//         body.idempotencyKey = uuidv4();

//         body.amountMoney = {
//             // amount: gross,
//             amount: gross,
//             currency: 'USD',
//         };
//         let paymentResponse = await paymentsApi.createPayment(body);

//         if (!paymentResponse){
//             return next(new ErrorHandler("Error with payment createPayment", 403));
//         }
//         const paymentRes = {
//             paymentInfo:{
//                 id:paymentResponse.result.payment.id,
//                 status:paymentResponse.result.payment.status
//             }, 
//             paidAt:paymentResponse.result.payment.createdAt
//         }
//         res.status(200).json({
//             success:true,
//             message:"Payment successful",
//             paymentRes
//             // paymentResponse:JSON.stringify(paymentResponse)
//         });

       
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }