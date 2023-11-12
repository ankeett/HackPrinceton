const express = require("express");
const { createProduct, getAllProductsPaginated, getAdminProducts,getAllProductsForACompany, getProductDetails, updateProduct, deleteProduct,
    createProductReview, getProductReviews, deleteReview, updateStock
       
    } = require("../controller/productController.js");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth.js")
const router = express.Router();


router.route("/product/create").post(isAuthenticatedUser,authorizedRoles("company"),createProduct);
router.route("/product/list/:radius/:selectedLat/:selectedLong").get(getAllProductsPaginated);
router.route("/product/listAll").get(getAdminProducts);
router.route("/product/list/me").post(isAuthenticatedUser,authorizedRoles("company"), getAllProductsForACompany)
router.route("/product/detail/:id").get(getProductDetails);
router.route("/product/update/:id").put(isAuthenticatedUser,authorizedRoles("company"),updateProduct);
router.route("/product/updateStock/:id").put(isAuthenticatedUser,updateStock);

router.route("/product/delete/:id").delete(isAuthenticatedUser,authorizedRoles("company"),deleteProduct);
router.route("/product/review/add/:productId").put(isAuthenticatedUser, authorizedRoles("user"),createProductReview);
router.route("/product/review/listAll/:productId").get(getProductReviews);
router.route("/product/review/delete/:productId").delete(isAuthenticatedUser,authorizedRoles("user"),deleteReview);



module.exports = router;