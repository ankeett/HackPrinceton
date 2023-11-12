const express = require("express");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const errorMiddleWare = require("./middleware/error.js")

const app = express();
app.use(cookieParser());
app.use(express.json({limit:"50mb"}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200
}));
app.use(bodyParser.urlencoded({limit: "50mb",extended:true}))
app.use(express.urlencoded({extended: true}));
//Route Imports


const user = require("./routes/userRoute.js");
const company = require("./routes/companyRoutes.js");
const product = require("./routes/productRoutes.js");
const cart = require("./routes/cartRoutes.js");
// const pay = require("./routes/paymentRoutes");
const order = require("./routes/orderRoutes.js");

app.use("/api/v1", user);
app.use("/api/v1", company);
app.use("/api/v1", product);
app.use("/api/v1", cart);
// app.use("/api/v1", pay);
app.use("/api/v1", order);

//Error middleware
app.use(errorMiddleWare);

module.exports = app;