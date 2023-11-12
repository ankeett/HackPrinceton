const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    creatorId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        required:true,
    },
    name:{
        type:String,
        required:[true, "Please Enter event Name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true, "Please Enter event Description"],
    },
    
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            },
        }
    ],
    
    category:{
        type:String,
        required:[true, "Please enter product Category"],

    },
    subcategory:{
        type:String,
        required:[true, "Please enter product Sub-Category"],
    },
    stock:{
        type:Number,
        required:[true, "Please enter how many people can register"],
        maxLength:[4, "Stock cannot exceed 4 characters"],
        default:1,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    
})


module.exports = mongoose.model("Product", productSchema);