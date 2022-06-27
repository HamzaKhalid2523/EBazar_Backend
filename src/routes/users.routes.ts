const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import UsersController from "../controllers/users.controllers";

router.post("/signup", UsersController.signupSeller);
router.post("/login", UsersController.loginSeller);
router.post("/logout", checkAuth, UsersController.logout);
router.put("/:_id/changePassword", checkAuth,  UsersController.changePassword);
router.post('/getVerificationCode', UsersController.getVerificationCode);
router.post('/verifyCode', UsersController.verifyCode);

router
  .route("/")
  .get(checkAuth, UsersController.getAllRecords)
  .post(checkAuth, UsersController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, UsersController.getOneRecord)
  .put(checkAuth, UsersController.updateRecord)
  .delete(checkAuth, UsersController.deleteRecord);

module.exports = router;
