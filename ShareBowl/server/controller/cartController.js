const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const ErrorHandler = require("../utils/errorHandler.js");

// Registers a Company


//only allow authorized user
// do not allow companies
exports.addToCart = async(req, res, next)=>{
    try{    

        const user = await User.findById(req.user.id);
        
       
        const {productId, quantity} = req.body;
        const product = await Product.findById(productId);

        if (!product){
            return next(new ErrorHandler("No  Such product exists", 403));
  
        }

        const existingCart = await Cart.findOne({productId:productId,userId:req.user.id});
        const userId = req.user.id;
        if (existingCart){
            return next(new ErrorHandler("Cart Already exists", 403));
        }
        const cart = await Cart.create(
            {
               productId, quantity, userId, name:product.name, stock:product.stock, imageUrl:product.images[0]?.url
               
            }
        ); 

        console.log("SUCCESS")
        const carts = await Cart.find({userId:userId});

        const gross = carts.reduce(
            (acc, item)=>acc + item.quantity * item.price, 0
        )
        res.status(200).json({
            success:true,
            message:"Item added to cart",
            cart,
            carts,
            gross
        })

        } 
        catch(error){
            console.log(error);
            next(error);
        }
    }
    

exports.deleteFromCart = async(req, res, next)=>{
    try{       
        const userId = req.user.id;
        
        //check if this user created that cart
        //first check if the cart exists
        const cart = await Cart.findOne({productId:req.params.productId, userId:userId});
        if (!cart){
            return next(new ErrorHandler("Cart Not found", 404));
        }
    
        
        //now at this point delete the item from the cart
        await cart.remove();
        const carts = await Cart.find({userId:userId});

        const gross = carts.reduce(
            (acc, item)=>acc + item.quantity * item.price, 0
        )
        console.log(carts);
        res.status(200).json({
            success:true,
            message:"Item deleted from cart",
            carts,
            gross,
        })

        } 
        catch(error){
            next(error);
        }
    }


exports.deleteEntireCart = async(req, res, next)=>{
    try {
        const userId = req.user.id;
        const carts = await Cart.find({userId:userId});
        // if (!carts){
        //     return next(new ErrorHandler("Carts Not found", 404));
        // }
        carts.map(async (cart, ind)=>{
            await cart.remove();
        })

        const gross = 0;
        res.status(200).json({
            success:true,
            message:"Entire Cart deleted",
            gross,
        })

    } catch (error) {
        next(error);
    }
}

//update cart quantity
exports.updateCart = async(req, res, next)=>{
    try{       
        const userId = req.user.id;
       
        //check if this user created that cart
        //first check if the cart exists
        const cart = await Cart.findOne({productId:req.params.productId, userId:userId});
        if (!cart){
            return next(new ErrorHandler("Cart Not found", 404));
        }
        
        
        //at this point update the cart
         //new:true returns the object after it has been modified

          //req.body contains quantity to be updated
         const cartUpdated = await Cart.findByIdAndUpdate(cart.id, req.body, {
            new:true,
            runValidators:true,
            useFindAndModify:false
        
        });
        const carts = await Cart.find({userId:userId});
        const gross = carts.reduce(
            (acc, item)=>acc + item.quantity * item.price, 0
        )
        res.status(200).json({
            success:true,
            message:"Item updated in cart",
            cartUpdated,
            carts,
            gross
        })

        } 
        catch(error){
            next(error);
        }
    }
    


//get a cart
exports.getCart = async(req, res, next) => {
    try {
        const {productId} = req.params;
        const cart = await Cart.findOne({productId:productId, userId:req.user.id});
        res.status(200).json({
            success:true,
            cart
        })

    } catch (error) {
        next(error);
    }
}

//show cart
exports.showCart = async(req, res, next) => {
    try {
        //show all cart for the particular user
        //first get the user id
        const userId = req.user.id;
        const carts = await Cart.find({userId:userId});

        const gross = carts.reduce(
            (acc, item)=>acc + item.quantity * item.price, 0
        )

        res.status(200).json({
            success:true,
            carts,
            gross
        })

    } catch (error) {
        next(error);
    }
}
    

    