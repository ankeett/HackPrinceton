const Company = require("../models/companyModel.js");
const Product = require("../models/productModel.js");
const User = require("../models/userModel.js");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/sendToken.js");
const sendEmail = require("../utils/sendEmail.js");

// Registers a Company
exports.registerCompany = async(req, res, next)=>{
    try{       
        const {name, email,password, phoneNumber, websiteUrl, lat, long} = req.body;
        const existinguser = await User.find({email});
        if (existinguser.length!=0){
            return  next(new ErrorHandler("Duplicate Email", 401));
        }

        const company = await Company.create(
            {
                name, email, password, phoneNumber, websiteUrl, location:{
                    type:"Point", coordinates:[long, lat]
                }      
            }
        ); 
        sendToken(company, 201, res);
        } 
        catch(error){
            next(error);
        }
    }
    
// Log In Company
exports.loginCompany = async(req, res, next) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }
        const existingUser = await Company.findOne({email}).select("+password");
        //remember that in userSchema we defined password to be select equals false
        //here we need to include +password show that we can get its value

        if(!existingUser) return next(new ErrorHandler("Comp does not exist", 404));
        

        const isPasswordCorrect = await existingUser.comparePassword(password);

        if (!isPasswordCorrect) return next(new ErrorHandler("Invalid credentials", 401));
        
        sendToken(existingUser, 200, res)
    } catch (error) {
        next(error);
    }
}


// Log Company out
exports.logoutCompany = async(req, res, next) =>{
    //set the token as null and you are logged out
    try {
        res.cookie("token", null, {
            expires:new Date(Date.now()),
            httpOnly:true,
        });
        res.status(200).json({
            success:true,
            message:"Company is Logged Out",
        })
    } catch (error) {
        next(error);
    }
}

//Change password
exports.changePassword = async(req, res, next)=>{
    try {
        const company = await Company.findById(req.user.id).select("+password");
        if(!company) return next(new ErrorHandler("Company does not exist", 404)); 
        const isPasswordMatched = await company.comparePassword(req.body.prevpassword);
        if (!isPasswordMatched){
            return next(new ErrorHandler("Password is Incorrect!", 400));
        }
        company.password = req.body.newpassword;
        await company.save();
        sendToken(company, 200, res);
    } catch (error) {   
        next(error)
    }
}

//Forgot Password
exports.forgotPassword = async (req, res, next) => {
    const company = await Company.findOne({email:req.body.email});
    if (!company){
        return next(new ErrorHandler("Company not found", 404));
    }

    // Get reset password token
    const resetToken = company.getResetPasswordToken();
    await company.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://localhost:3000/api/v1/company/password/reset/${resetToken}`;

    const message = `Click on the link below to reset your password \n ${resetPasswordUrl}\n\n
    If you have not requested this email then please ignore it.
    `
    try {
        await sendEmail({
            email:company.email,
            subject : "Password Reset Token",
            message
        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${company.email} successfully`,
        })
    } catch (error) {
        //Set the resetToken and expiry to undefined
        company.resetPasswordToken = undefined;
        company.resetPasswordExpire = undefined;
        await company.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500));
    }
}

//Reset Password
exports.resetPassword = async(req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const company = await Company.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt : Date.now()}
        })
        if (!company){
            return next (new ErrorHandler("Reset password token is invalid or has been expired", 400));
        }
        company.password = req.body.password;
        company.resetPasswordToken = undefined;
        company.resetPasswordExpire = undefined;
        await company.save();  

        sendToken(company, 200, res);
    } catch (error) {
        next(error)
    }

}

//Send Activate email link
exports.sendActivateLink = async(req, res, next) => {
    try {
        const company = await Company.findOne({email:req.body.email});
        if (!company){
            return next(new ErrorHandler("Company not found", 404));
        }
        //if the account is already activated
        if (!company.isActivated){
            // Get reset password token
            const activateToken = company.getActivateToken();
            await company.save({validateBeforeSave:false});
            const activateEmailUrl = `${req.protocol}://localhost:3000/api/v1/company/account/activate/${activateToken}`;
            const message = `Click on the link below to activate your account \n ${activateEmailUrl}\n\n`
            try {
                await sendEmail({
                    email:company.email,
                    subject : "Account Activation Token",
                    message
                });
        
                res.status(200).json({
                    success:true,
                    message:`Email sent to ${company.email} successfully`,
                })
            } catch (error) {
                //Set the activateToken and expiry to undefined
                company.activateToken = undefined;
                company.activateExpire = undefined;
                await company.save({validateBeforeSave:false});
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
        const company = await Company.findOne({
            activateToken,
            activateExpire:{$gt : Date.now()}
        })

        if (!company){
            return next (new ErrorHandler("Activation token is invalid or has been expired", 400));
        }

        company.isActivated = true;
        company.activateToken = undefined;
        company.activateExpire = undefined;

        await company.save();
        sendToken(company, 200, res);
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
        const company = await Company.findByIdAndUpdate(req.user.id, newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    
        res.status(200).json({
            success:true,
            company
        });
    } catch (error) {
        next(error);
    }
}

//Get all company - admin
exports.getAllCompanies = async(req, res, next)=> {
    try {
        const companies = await Company.find();

        res.status(200).json({
            success:true,
            companies,
        })
    } catch (error) {
        next(error);
    }
}

//get a single company
exports.getACompany = async(req, res, next)=>{
    try {
        const company = await Company.findById(req.params.id);
        if (!company){
            return next(new ErrorHandler(`User with id : ${req.params.id} does not exist`));
        }
        res.status(200).json({
            success:true,
            company
        })
    } catch (error) {
        next(error);
    }
}

// delete a company
exports.deleteCompany = async(req, res, next) => {
    try {
        const companies = await Company.findById(req.params.id);
        if(!companies){
            return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
        }

        // TODO: we will remove cloudinary 

        await companies.remove();
        res.status(200).json({
            success:true,
            message:"Company deleted successfully!"
        });
    } catch (error) {
        next(error);
    }
}

//add Products in company's name
exports.addProducts = async(req, res, next) => {
    try {
        const company = await Company.findById(req.user.id);
        //copy product id and add it to 
        const productID = req.body.productID;
        const product = await Product.findById(productID);

        if (product.creatorID != req.user.id){
            return next(new ErrorHandler("You cannot add this product since it is not yours", 400));
        }
        // TODO: make sure that this is a string
        company.products.push(productID);
        await company.save();

        res.status(200).json({
            success:true,
            message:"Product added successfully!",
        })
    } catch (error) {
        next(error);
    }
}

exports.getCompanyByRadius = async(req, res, next) => {
    try {

        const filteredCompanies = await Company.find({
            location: {
                $near: {
                  $geometry: {
                    type: "Point",
                    coordinates: [77.216721, 28.644800]
                  },
                  $minDistance: 0,
                  $maxDistance: 1000000
                }
              }
        })
        res.status(200).json({
            success:true,
            filteredCompanies,
        })

        
    } catch (error) {
        next(error);
    }
}