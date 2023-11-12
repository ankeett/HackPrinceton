

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        required:true,
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("Order", orderSchema);