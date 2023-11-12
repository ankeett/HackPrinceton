const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendToken = require("../utils/sendToken");
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter company's name"], 
    },
    email:{
        type:String,
        required:[true, "Please enter company's Email"],
        unique:true,
        validate:[validator.isEmail, "Please enter valid Email"],
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[8, "Password should have at least 8 characters"],
        select:false,//when quering password should not be shown
    },
    websiteUrl:{
        type: String,
        unique: true
    },
    //account created at not the date of establishment of the company
    createdAt:{
        type:Date,
        default:Date.now,
    },   
    phoneNumber:{
        type:Number,
        required: [true, "Please enter company's phone number"],
        unique:true

    },
    role:{
        type:String,
        default:"company",
    },

    location :  {
        type: {
            type: String,
            enum:['Point'],
            default:"Point"
          },
          coordinates: {
            type: [Number], //the type is an array of numbers
            required:true
          }
    },

    // lat:{
    //     type:Number,
    //     required:true
    // },
    // long:{
    //     type:Number,
    //     required:true
    // },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
    activateToken:String,
    activateExpire:Date,
    isActivated:{
        type:Boolean,
        default:false,
    },
    productsOffered:[
        {
            type:mongoose.Schema.ObjectId,
        }
    ]

})

companySchema.index({location:"2dsphere"});
companySchema.path('websiteUrl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');


//hashing the password before saving the user
// we cannot use this inside arrow function
companySchema.pre("save", async function(next){
    //there will many instances of saving the user
    //but we only want to hash the password when we are
    // either creating the user or changing password
   try {
        if (this.isModified("password")){
            this.password = await bcryptjs.hash(this.password, 10);
        }
        next();
   } catch (error) {
        next(error);
   }
    
    
})

//compare password 
companySchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password, this.password);
}

//JWT token
companySchema.methods.getJWTToken = function(){
    return jwt.sign(
    {
        id:this._id
    }
    ,
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRY,
    }
    )
}

companySchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Hashing resetToken and then adding it to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

companySchema.methods.getActivateToken = function(){
    const activateToken = crypto.randomBytes(20).toString("hex");
    // Hashing activateToken and then adding it to userSchema
    this.activateToken = crypto.createHash("sha256").update(activateToken).digest("hex");
    this.activateExpire = Date.now() + 15*60*1000;
    return activateToken;
}
module.exports = mongoose.model("Company", companySchema);