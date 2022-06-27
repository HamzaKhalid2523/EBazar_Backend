const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import LocalShopsController from "../controllers/localShops.controller";

router
  .route("/")
  .get(checkAuth, LocalShopsController.getAllRecords)
  .post(checkAuth, LocalShopsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, LocalShopsController.getOneRecord)
  .put(checkAuth, LocalShopsController.updateRecord)
  .delete(checkAuth, LocalShopsController.deleteRecord);

module.exports = router;
