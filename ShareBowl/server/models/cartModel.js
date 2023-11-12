

/*
    Product Id
    Quantity
    UserId
*/



const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:[true, "Please Enter product Name"],
        trim:true,
    },
    
    price:{
        type:Number,
        required:[false, "Please Enter product Price"],
        maxLength:[6, "Price cannot exceed 6 characters"],
    },
   
    imageUrl:
        {
            type:String,
        },
    
    stock:{
        type:Number,
        required:[true, "Please enter product Stock"],
        maxLength:[4, "Stock cannot exceed 4 characters"],
        default:1,
    },
    
    quantity:{
        type:Number,
        required:[true, "Please Enter product quantity"],
        maxLength:[6, "Price cannot exceed 6 characters"],
    },
    
    
})


module.exports = mongoose.model("Cart", cartSchema);