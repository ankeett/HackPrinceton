const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database")


const cloudinary = require("cloudinary");


//config
dotenv.config({path:"config/config.env"});

//Connect to Database
connectDB();
//
app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
}) 

//Cloudinary setup
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});