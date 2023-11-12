const express = require("express");
const { registerCompany , loginCompany, logoutCompany, forgotPassword, resetPassword, changePassword, sendActivateLink,activateAccount,getAllCompanies, getACompany, updateProfile, deleteCompany, addProducts, deleteProducts,getCompanyByRadius} = require("../controller/companyController");

const router = express.Router();

const {isAuthenticatedUser,authorizedRoles} = require("../middleware/auth");

//company routes
router.route("/company/register").post(registerCompany);
router.route("/company/login").post(loginCompany);
router.route("/company/logout").get(logoutCompany);
router.route("/company/password/forgot").post(forgotPassword);
router.route("/company/password/reset/:token").put(resetPassword);
// router.route("/me").get(isAuthenticatedUser, getACompany);
router.route("/company/changePassword").put(isAuthenticatedUser, changePassword);
router.route("/company/account/sendactivate").post(sendActivateLink);
router.route("/company/account/activate/:token").put(activateAccount);
router.route("/company/me/update").put(isAuthenticatedUser ,updateProfile);
router.route("/companies/find/:radius").get(getCompanyByRadius);


//admin routes
router.route("/admin/companies/list").get(isAuthenticatedUser, authorizedRoles("admin"), getAllCompanies);
router.route("/admin/company/:id")
.get(isAuthenticatedUser, authorizedRoles("admin"), getACompany)
.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteCompany);

module.exports = router;