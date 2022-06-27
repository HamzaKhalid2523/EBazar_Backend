const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import ProductsController from "../controllers/products.controller";

router
  .route("/")
  .get(checkAuth, ProductsController.getAllRecords)
  .post(checkAuth, ProductsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, ProductsController.getOneRecord)
  .put(checkAuth, ProductsController.updateRecord)
  .delete(checkAuth, ProductsController.deleteRecord);

module.exports = router;
