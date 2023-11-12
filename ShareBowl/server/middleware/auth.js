const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Company = require("../models/companyModel")

exports.isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token){
        return next(new ErrorHandler("Not logged in", 402));
    }
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedUser.id);
    if (!req.user){
        req.user = await Company.findById(decodedUser.id);
    }
    next();
}

exports.authorizedRoles = (...roles) =>{  
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        };
        next();
    }   
}