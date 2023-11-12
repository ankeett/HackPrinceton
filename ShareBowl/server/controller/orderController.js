const Product = require("../models/productModel");
const Company = require('../models/companyModel');
const Cart = require("../models/cartModel");
const User = require('../models/userModel');
const Order = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler")
const sendEmail = require("../utils/sendEmail.js");

const ApiFeatures = require("../utils/apiFeatures");



//create an order
exports.createAnOrder = async(req, res, next) => {
    try {
        console.log("here")
        
        const carts = await Cart.find({userId:req.user.id});
       
        let order = {};
        carts.map(async (item, ind)=>{
            const product = await Product.findById(item.productId);
            order = await Order.create({productId:item.productId, companyId:product.creatorId, status:"Processing",
                userId:req.user.id  
            });  
            // //update the product stock
            await Product.findByIdAndUpdate(item.productId, {stock:product.stock-item.quantity}, {new:true,
                runValidators:true,  
                useFindAndModify:false
            
            });
        })
        
        const orders = await Order.find({userId:req.user.id})

        res.status(201).json({
            success:true,
            order,
            orders

        })

    } catch (error) {
        next(error);
    }
}

exports.emailConfirmation = async(req,res, next)=> {
    try {
        const user = await User.findById(req.user.id);
        const message = `Order Confirmation`
        await sendEmail({
            email:user.email,
            subject : "Confirmed Order",
            message
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
        
    } catch (error) {
        next(error)
    }
}

//get all orders
//we will be getting all the orders for a particular company
exports.getAllOrders = async(req, res, next) => {
    try {
        const currentPage = req.body.currentPage || 1;
        const skip = 6 * (currentPage -1);
        const ordersForCount = await Order.find({companyId:req.user.id});

        const orders = await Order.find({companyId:req.user.id}).limit(6).skip(skip);
        if (!orders){
            return next(new ErrorHandler("Error finding orders", 404));
        }
        res.status(200).json({
            success:true,
            orders,
            ordersForCount
        })

    } catch (error) {
        next(error)
    }
}

//get orders by a specific user for a company - by email
exports.getAllOrdersOfAUser = async(req, res, next) => {
    try {
        const user = await User.find({email:req.body.email, companyId:req.user.id});
        if (!user){
            return next(new ErrorHandler("No such user exists", 404));
 
        }

        const orders = await Order.find({userId:user.id});
        if (!orders){
            return next(new ErrorHandler("Error getting orders", 404));

        }
        res.status(200).json({
            success:true,
            orders
        })

    } catch (error) {
        next(error);
    }
}

//lookup of orders by a user

exports.lookUpMyOrders = async(req, res, next) => {
    try {
        const user = await User.find({userId:req.user.id});
        if (!user){
            return next(new ErrorHandler("No such user exists", 404));
 
        }


        const currentPage = req.body.currentPage || 1;
        const skip = 6 * (currentPage -1);

        const orders = await Order.find({userId:req.user.id}).limit(6).skip(skip);
        const ordersForCount = await Order.find({userId:req.user.id});
        if (!orders){
            return next(new ErrorHandler("Error getting orders", 404));

        }

        res.status(200).json({
            success:true,
            orders,
            ordersForCount

        })

    } catch (error) {
        next(error);
    }
}
//get all the orders for a product
exports.getAllOrdersForAProduct = async(req, res, next) => {
    try {
        const orders = await Order.find({productId:req.body.productId});
        if (!orders){
            return next(new ErrorHandler("Error getting orders", 404));

        }
        res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        next(error);
    }
}

//get a specific order by orderID
exports.getAOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order){
            return next(new ErrorHandler("Error finding order", 404));
        }
        res.status(200).json({
            success:true,
            order
        })
        
    } catch (error) {
        next(error)
    }
}
//update status of an order by orderID
exports.updateAnOrder = async(req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {new:true,
            runValidators:true,
            useFindAndModify:false
        
        });
        // console.log("ma bhitra chirey")
        // const order = await Order.findById(req.params.orderId);
        // order.status = req.body.status;
        // await order.save();
        if (!order){
            return next(new ErrorHandler("Error finding order", 404));
        }
        res.status(200).json({
            success:true,
            order
        })
        
    } catch (error) {
        next(error)
    }
}

//delete an order
exports.deleteAnOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order){
            return next(new ErrorHandler("Error finding order", 404));
        }
        await order.remove();
        
        res.status(200).json({
            success:true,
            message:"Order deleted succesfully"
        })
        
    } catch (error) {
        next(error)
    }
}
