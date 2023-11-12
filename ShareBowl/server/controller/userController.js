const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/sendToken.js");
const sendEmail = require("../utils/sendEmail.js");
const Company = require('../models/companyModel.js')

// Registers a User
exports.registerUser = async(req, res, next)=>{
    try{
        
        const {name, email, password} = req.body;

        const existinguser = await Company.find({email});
        if (existinguser.length!=0){
            return  next(new ErrorHandler("Duplicate Email", 401));
        }
        const user = await User.create(
            {
                name, email, password,           
            }
        );
    
        sendToken(user, 201, res);
    } 
    catch(error){
            next(error);
    }
}
    
// Log In User
exports.loginUser = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }
        const existingCompany = await Company.findOne({email}).select("+password");
        const existingUser = await User.findOne({email}).select("+password");
        
        //remember that in userSchema we defined password to be select equals false
        //here we need to include +password show that we can get its value
        if(!existingUser && !existingCompany) return next(new ErrorHandler("User does not exist", 404));
        
        const validuser = existingUser ? existingUser: existingCompany;

        const isPasswordCorrect = await validuser.comparePassword(password);

        if (!isPasswordCorrect) return next(new ErrorHandler("Invalid credentials", 401));
        
        sendToken(validuser, 200, res)
    } catch (error) {
        next(error);
    }
}


// Log User out
exports.logoutUser = async(req, res, next) =>{
    //set the token as null and you are logged out
    try {
        res.cookie("token", null, {
            expires:new Date(Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            success:true,
            message:"Logged Out",
        })
    } catch (error) {
        next(error);
    }
}

//Change password
exports.changePassword = async(req, res, next)=>{
    try {
        const user = await User.findById(req.user.id).select("+password");
        if(!user) return next(new ErrorHandler("User does not exist", 404)); 

        const isPasswordMatched = await user.comparePassword(req.body.prevpassword);
        if (!isPasswordMatched){
            return next(new ErrorHandler("Password is Incorrect!", 400));
        }
        user.password = req.body.newpassword;
        await user.save();
        sendToken(user, 200, res);
    } catch (error) {   
        next(error)
    }
}

//Forgot Password
exports.forgotPassword = async (req, res, next) => {
    const existinguser = await User.findOne({email:req.body.email});
    const company = await Company.findOne({email:req.body.email});
    if (!existinguser && !company){
        return next(new ErrorHandler("User not found", 404));
    }
    const user = existinguser ? existinguser : company;
    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://localhost:3000/api/v1/password/reset/${resetToken}`;

    const message = `Click on the link below to reset your password \n ${resetPasswordUrl}\n\n
    If you have not requested this email then please ignore it.
    `
    try {
        await sendEmail({
            email:user.email,
            subject : "Password Reset Token",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        //Set the resetToken and expiry to undefined
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
}

//Reset Password
exports.resetPassword = async(req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const existinguser = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt : Date.now()}
        })
        const company = await Company.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt : Date.now()}
        })
        if (!existinguser && !company){
            return next (new ErrorHandler("Reset password token is invalid or has been expired", 400));
        }
        const user = existinguser?existinguser:company;
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();  

        sendToken(user, 200, res);
    } catch (error) {
        next(error)
    }

}

//Send Activate email link
exports.sendActivateLink = async(req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if (!user){
            return next(new ErrorHandler("User not found", 404));
        }
        //if the account is already activated
        if (!user.isActivated){
            // Get reset password token
            const activateToken = user.getActivateToken();
            await user.save({validateBeforeSave:false});
            const activateEmailUrl = `${req.protocol}://localhost:3000/api/v1/account/activate/${activateToken}`;
            const message = `Click on the link below to activate your account \n ${activateEmailUrl}\n\n`
            try {
                await sendEmail({
                    email:user.email,
                    subject : "Account Activation Token",
                    message
                });
        
                res.status(200).json({
                    success:true,
                    message:`Email sent to ${user.email} successfully`,
                })
            } catch (error) {
                //Set the activateToken and expiry to undefined
                user.activateToken = undefined;
                user.activateExpire = undefined;
                await user.save({validateBeforeSave:false});
                return next(new ErrorHandler(error.message, 500));
            }
        }
        else{
            res.status(200).json({
                success:true,
                message:"User is already activated."
            })
        }
    } catch (error) {
        next(error);
    }
   
}

// Activate email
exports.activateAccount = async(req, res, next) => {
   try {
        const activateToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const user = await User.findOne({
            activateToken,
            activateExpire:{$gt : Date.now()}
        })

        if (!user){
            return next (new ErrorHandler("Activation token is invalid or has been expired", 400));
        }

        user.isActivated = true;
        user.activateToken = undefined;
        user.activateExpire = undefined;

        await user.save();
        sendToken(user, 200, res);
   } catch (error) {
        next(error);
   }
}



// update user profile
exports.updateProfile = async(req, res, next) => {
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email,
        };

        //lets add cloudinary later
        const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        next(error);
    }
}

//Get all users - admin
exports.getAllUsers = async(req, res, next)=> {
    try {
        const users = await User.find();

        res.status(200).json({
            success:true,
            users,
        })
    } catch (error) {
        next(error);
    }
}


//get a single user
exports.getAUser = async(req, res, next)=>{
    try {
        const user = await User.findById(req.params.id);
        if (!user){
            return next(new ErrorHandler(`User with id : ${req.params.id} does not exist`));
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        next(error);
    }
}

//Update the role of a user
exports.updateUserRole = async(req, res, next) => {
    try {
        const newUserData = {
            role:req.body.role
        }   
        //we will add cloudinary later
        const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    
        res.status(200).json({
            success:true,
            message:`User's role changed to ${req.body.role}`
        });
    } catch (error) {
        next(error);
    }
}

// delete a user
exports.deleteUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
        }
        // TODO: we will remove cloudinary 
        await user.remove();
        res.status(200).json({
            success:true,
            message:"User deleted successfully!"
        });
    } catch (error) {
        next(error);
    }
}


exports.getUserDetails = async(req, res, next)=> {
    try {
     //check if its a user
     const existingUser = await User.findById(req.user.id);
     
     //else check if its a company
     const existingCompany = await Company.findById(req.user.id);
    
     if (!existingCompany && !existingUser){
         //at this point there is no user with the id return an error
         return next(new ErrorHandler(`User does not exist`));
     }
     
 
     const user = existingUser ? existingUser: existingCompany;
     res.status(200).json({
         success:true,
         user
     })
     
    } catch (error) {
         next(error);
    }
 }



 //get your review for a product
 exports.getYourRevForAproduct = async(req, res, next) => {
    try {

        const product  = await Product.findById(req.params.productId);
        if(!product){
            return next(new ErrorHandler(`Product does not exist with id: ${req.params.productId}`, 404));
        }

        let rating = 0, comment = "", num = 0;
        product?.reviews?.map((review, index)=>{
            if (review.user.toString() === req.user.id){
                rating = review.rating,
                comment = review.comment,
                num = 1
            }
        })

        
        res.status(200).json({
            success:true,
            rating, 
            comment,
            num

        })

    } catch (error) {
        next(error);
    }
 }