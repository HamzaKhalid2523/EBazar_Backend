const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/user-check-auth");

import OrderController from "../controllers/order.controller";

router.delete('/deleteMany', checkAuth, OrderController.deleteManyRecord);

router
  .route("/")
  .get(checkAuth, OrderController.getAllRecords)
  .post(checkAuth, OrderController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, OrderController.getOneRecord)
  .put(checkAuth, OrderController.updateRecord)
  .delete(checkAuth, OrderController.deleteRecord);

module.exports = router;
