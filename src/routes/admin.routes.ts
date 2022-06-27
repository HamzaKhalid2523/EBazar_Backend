const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import AdminController from "../controllers/admin.controllers";

router.post("/login", AdminController.loginAdmin);
router.post("/logout", checkAuth, AdminController.logout);
router.post("/register", checkAuth,  AdminController.createNewRecord);
router.put("/:_id/changePassword", checkAuth,  AdminController.changePassword);

router
  .route("/")
  .get(checkAuth, AdminController.getAllRecords)
  .post(checkAuth, AdminController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, AdminController.getOneRecord)
  .put(checkAuth, AdminController.updateRecord)
  .delete(checkAuth, AdminController.deleteRecord);

module.exports = router;
