const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import MartProductsController from "../controllers/martProducts.controller";

router
  .route("/")
  .get(checkAuth, MartProductsController.getAllRecords)
  .post(checkAuth, MartProductsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, MartProductsController.getOneRecord)
  .put(checkAuth, MartProductsController.updateRecord)
  .delete(checkAuth, MartProductsController.deleteRecord);

module.exports = router;
