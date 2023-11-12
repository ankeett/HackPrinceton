const Product = require("../models/productModel");
const Company = require('../models/companyModel')
const ErrorHandler = require("../utils/errorHandler")
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//Create product -> Admin
exports.createProduct = async (req, res, next) => {
    try {
       
        // add cloudinary - images
        let images = [];
        if (typeof(req.body.images) ==="string"){
            images.push(req.body.images);
        }else{  
            images = req.body.images;
        }
        const imagesLink = [];
        for (let i = 0; i < images.length; i++){


            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder:"BuildSupplyProducts",
            });

            imagesLink.push({
                public_id:result.public_id,
                url:result.secure_url,
            })

           
        }

        
        const {name, description, category, subcategory, stock } = req.body;

        const product = await Product.create({
            name, description, category, subcategory, stock, creatorId:req.user.id,
            images:imagesLink 
        });

        res.status(201).json({
        success:true,
        product
    })
    } catch (error) {
        console.log(error)
        next(error);
    }  
}

//Update product -- admin
exports.updateProduct = async (req, res, next) => {
    try {

        let product = await Product.findById(req.params.id);
        //check if the product is present
        if(!product){
            return next(new ErrorHandler("Product Not Found", 404));
        }
        //check if the product was created by the user
        if (product.creatorId != req.user.id){
            return next(new ErrorHandler("User Not Authorized", 401));
        }

        //get all the images and imagesString

        const oldImagesFromDB = req.body.images;

        //now we have  images and imagesString
        //images refer to new ones 
        //and imagesString refer to old ones


         // add cloudinary - new images
         let newImages = [];
         if (typeof(req.body.newImages) ==="string"){
            newImages.push(req.body.newImages);
         }else{  
            newImages = req.body.newImages;
         }
         const imagesLink = [];

         //if adding new images
         for (let i = 0; i < newImages.length; i++){
             const result = await cloudinary.v2.uploader.upload(newImages[i],{
                 folder:"BuildSupplyProducts",
             });
             imagesLink.push({
                 public_id:result.public_id,
                 url:result.secure_url,
             })
            
         }
        for (let i = 0; i< oldImagesFromDB.length; i++){
            imagesLink.push(oldImagesFromDB[i]);
        }

         const {name, description, subcategory, stock,} = req.body;
 

     //new:true returns the object after it has been modified
     const productUpdated = await Product.findByIdAndUpdate(req.params.id, { name, description, 
         subcategory, stock,
        images:imagesLink}, {new:true,
         runValidators:true,
         useFindAndModify:false
     
     });
     const products = await Product.find();
     res.status(200).json({
         success:true,
         product:productUpdated,
         products
     })

     
    } catch (error) {
         next(error)
    }    

}


//Get all products 
//pagination applied - also allows filter
exports.getAllProductsPaginated = async (req, res,next)=>{
    try{  

        const resultPerPage = 8;
        const query =  {
            
            location: {
                $near: {
                  $geometry: {
                    type: "Point",
                    coordinates: [req.params.selectedLong, req.params.selectedLat]
                  },
                  $minDistance: 0,
                  $maxDistance: req.params.radius*1000
                }
              }
        }
            const filteredCompanies = await Company.find(
                query
            )

            const companyIds = [];
            for (let i = 0; i < filteredCompanies.length; i++){
                companyIds.push(filteredCompanies[i].id);
            }

            
        const productsCount = await Product.countDocuments();
        console.log(req.query)
       
        const apiFeature = new ApiFeatures( Product, req.query, companyIds);
        
        apiFeature.search();
        apiFeature.filter();
        
        
        let products =  await apiFeature.query;
       
        const filteredCount = products.length;
        apiFeature.pagination(resultPerPage);
        products = await apiFeature.query.clone();

        //get company location for each product
        const productLocation = [];
        for (let i = 0; i < products.length; i++){
            //find the company
            const company = await Company.findById(products[i].creatorId);
            productLocation.push(company.location.coordinates);
        }

        res.status(200).json({
            success: true,
            products,
            productsForCount:products,
            resultPerPage,
            productLocation,
            filteredCount
        });
    } catch(error) {
        next(error);
    }  
}


//Get All Products -- admin
exports.getAdminProducts = async (req, res, next)=>{
    try{
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products, 
            productsForCount:products   
        });
    } catch(error) {
        next(error);
    }
  
    
}


//Get Product Details
exports.getProductDetails = async(req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            if(!product){
                return next(new ErrorHandler("Product Not Found", 404));
            }
            
            res.status(200).json({
                success:true,
                product
            })
        } catch (error) {
            next(error);   
        }
}



//Update product -- anyone
exports.updateStock = async (req, res, next) => {
    try {

     let product = await Product.findById(req.params.id);
     //check if the product is present
     if(!product){
         return next(new ErrorHandler("Product Not Found", 404));
     }
     //TODO images
     const {stock} = req.body;
     //new:true returns the object after it has been modified
     const productUpdated = await Product.findByIdAndUpdate(req.params.id, {stock}, {new:true,
         runValidators:true,
         useFindAndModify:false
     
     });
     res.status(200).json({
         success:true,
         product:productUpdated
     })

     
    } catch (error) {
         next(error)
    }    

}


//Delete a product --admin
exports.deleteProduct = async (req, res, next) => {
   
       try {
            const product = await Product.findById(req.params.id);
            //check if product present
            if(!product){
                return next(new ErrorHandler("Product Not Found", 404));
            }
            //check if user is authprized
            if (product.creatorId != req.user.id){
                return next(new ErrorHandler("User Not Authorized", 401));
            }
            //TODO remove image from cloudinary
            await product.remove();
            const products = await Product.find({creatorId:req.user.id});
            res.status(200).json({
                success:true,
                products,
                message:"Product Deleted Successfully",
            })
       } catch (error) {
            next(error);
       }
    
}

//TODO get all products for a company
exports.getAllProductsForACompany = async(req, res, next) => {
    try {

        const productsForCount = await Product.find({creatorId:req.user.id});

        if (!productsForCount){
            return next(new ErrorHandler("No Products for this company", 404));
        }
        const currentPage = req.body.currentPage || 1;
        const skip = 5 * (currentPage -1);

        const products = await Product.find({creatorId:req.user.id}).limit(5).skip(skip);

        res.status(200).json({
            success:true,
            products,
            productsForCount
        })
    } catch (error) {
        next(error)
    }
}



//Create new review or update the new review
exports.createProductReview  = async (req, res, next)=>{
    try {

        const productId = req.params.productId;
        const {rating, comment} = req.body;
        const review = {
            user:req.user.id,
            name:req.user.name,
            rating:Number(rating),
            comment,

        }
        //find the product
        const product = await Product.findById(productId);
        //check for the product
        if(!product){
            return next(new ErrorHandler("Product Not Found", 404));
        }
        //check if the user has already reviewed
        const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());
        //if yes then update the comment and rating
        if(isReviewed){
            product.reviews.forEach((rev)=>{
                if (rev.user.toString()===req.user._id.toString()){
                    rev.rating = rating;
                    rev.comment = comment;
                    
                }
            })
        }
        //if no then push the new comment and rating in user's name
        else{
            product.reviews.push(review);
            product.numOfReview = product.reviews.length;
            
        }

        //calculate the average rating
        let average = 0;
        product.reviews.forEach(rev=>{
            average += rev.rating;
        })
        product.ratings = average/product.numOfReview;

        await product.save({validateBeforeSave:false});

        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        next(error);
    }

}


//get all the product reviews for a product
exports.getProductReviews = async (req, res, next) => {
   
    try {
        const product = await Product.findById(req.params.productId);
        if(!product){
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).json({
            success:true,
            reviews:product.reviews,
        });
    } catch (error) {
        next(error);
    }
}


//delete a review 
exports.deleteReview = async (req, res, next)=>{
    try {

        //find the product
        const prod = await Product.findById(req.params.productId);
        if(!prod){
            return next(new ErrorHandler("Product not found", 404));
        }
        //check if the user is allowed to delete this review          


        //filter the reviews
        const reviews = prod.reviews.filter((rev)=>{

            return rev.user.toString()!== req.user.id
            }   
            );
        //recalculate the average rating
        let average = 0;
        reviews.forEach(rev=>{
            average += rev.rating;
        });
        let ratings = 0;
        if(reviews.length === 0){
            ratings = 0;
        }
        else{
            ratings = average / reviews.length;
        }
        //get the number of reviews
        const numOfReview  = reviews.length;

        const product = await Product.findByIdAndUpdate(req.params.productId,{
            reviews,
            ratings,
            numOfReview,
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        })



        res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}