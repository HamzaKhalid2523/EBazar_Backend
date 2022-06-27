const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import SellerController from "../controllers/seller.controllers";

router.post("/signup", SellerController.signupSeller);
router.post("/login", SellerController.loginSeller);
router.post("/logout", checkAuth, SellerController.logout);
router.put("/:_id/changePassword", checkAuth,  SellerController.changePassword);

router
  .route("/")
  .get(checkAuth, SellerController.getAllRecords)
  .post(checkAuth, SellerController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, SellerController.getOneRecord)
  .put(checkAuth, SellerController.updateRecord)
  .delete(checkAuth, SellerController.deleteRecord);

module.exports = router;
