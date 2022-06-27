const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/user-check-auth");

import CartController from "../controllers/cart.controller";

router.delete('/deleteMany', checkAuth, CartController.deleteManyRecord);

router
  .route("/")
  .get(checkAuth, CartController.getAllRecords)
  .post(checkAuth, CartController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, CartController.getOneRecord)
  .put(checkAuth, CartController.updateRecord)
  .delete(checkAuth, CartController.deleteRecord);

module.exports = router;
