const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import LocalProductsController from "../controllers/localProducts.controller";

router
  .route("/")
  .get(checkAuth, LocalProductsController.getAllRecords)
  .post(checkAuth, LocalProductsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, LocalProductsController.getOneRecord)
  .put(checkAuth, LocalProductsController.updateRecord)
  .delete(checkAuth, LocalProductsController.deleteRecord);

module.exports = router;
