

/*

    add to cart
    remove from cart
    update cart
    show all
*/


const express = require("express");
const { createAnOrder, getAOrder, getAllOrders, emailConfirmation, getAllOrdersForAProduct,lookUpMyOrders, getAllOrdersOfAUser, deleteAnOrder, updateAnOrder} = require("../controller/orderController");
const router = express.Router();
const {isAuthenticatedUser,authorizedRoles} = require("../middleware/auth");

//create an order
router.route("/order/create").post(isAuthenticatedUser, authorizedRoles("user"), createAnOrder);
router.route("/order/sendConfirmation").get(isAuthenticatedUser, emailConfirmation);
//get all orders
router.route("/order/all").post(isAuthenticatedUser, authorizedRoles("company"), getAllOrders);
//get orders by an user for a company
router.route("/order/company/user/all").get(isAuthenticatedUser,authorizedRoles("company"), getAllOrdersOfAUser);
//get order by product
router.route("/order/company/product/all").get(isAuthenticatedUser,authorizedRoles("company"), getAllOrdersForAProduct);
//lookup my orders
router.route("/order/my/all").post(isAuthenticatedUser,authorizedRoles("user"), lookUpMyOrders);

//get a specific order
router.route("/order/:orderId").get(isAuthenticatedUser,authorizedRoles("company"),getAOrder);

//update status of an order
router.route("/order/update/:orderId").post(isAuthenticatedUser,authorizedRoles("company"), updateAnOrder);

//delete an order
router.route("/order/company/:orderId").delete(isAuthenticatedUser,authorizedRoles("company"), deleteAnOrder);


module.exports = router;