

/*

    add to cart
    remove from cart
    update cart
    show all
*/


const express = require("express");
const { addToCart, deleteFromCart,deleteEntireCart, updateCart, showCart, getCart} = require("../controller/cartController");
const router = express.Router();
const {isAuthenticatedUser,authorizedRoles} = require("../middleware/auth");


//routes
router.route("/user/cart/add").post(isAuthenticatedUser,authorizedRoles("user"),addToCart);
router.route("/user/cart/delete/:productId").delete(isAuthenticatedUser,authorizedRoles("user"),deleteFromCart);
router.route("/user/cart/deleteAll").delete(isAuthenticatedUser,authorizedRoles("user"),deleteEntireCart);
router.route("/user/cart/update/:productId").put(isAuthenticatedUser,authorizedRoles("user"),updateCart);
router.route("/user/cart/all").get(isAuthenticatedUser,authorizedRoles("user"),showCart);

router.route("/user/cart/get/:productId").get(isAuthenticatedUser,authorizedRoles("user"),getCart);

module.exports = router;