const express = require("express");
const { getAllUsers, registerUser,
     loginUser, logoutUser , changePassword,
      forgotPassword, resetPassword,
       sendActivateLink, activateAccount,
        getAUser,
        updateUserRole,
        updateProfile,
        deleteUser,
        getUserDetails,
        getYourRevForAproduct
       
    } = require("../controller/userController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")
const router = express.Router();


//user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/changePassword").post(isAuthenticatedUser, changePassword);
router.route("/password/forgot").post( forgotPassword);
router.route("/password/reset/:token").put( resetPassword);
router.route("/account/sendactivate").post(sendActivateLink);
router.route("/account/activate/:token").put(activateAccount);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/review/me/:productId").get(isAuthenticatedUser, authorizedRoles("user"), getYourRevForAproduct)

// admin routes

module.exports  = router;