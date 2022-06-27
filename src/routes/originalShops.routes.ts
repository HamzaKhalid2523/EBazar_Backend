const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import OriginalShopsController from "../controllers/originalShops.controller";

router
  .route("/")
  .get(checkAuth, OriginalShopsController.getAllRecords)
  .post(checkAuth, OriginalShopsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, OriginalShopsController.getOneRecord)
  .put(checkAuth, OriginalShopsController.updateRecord)
  .delete(checkAuth, OriginalShopsController.deleteRecord);

module.exports = router;
