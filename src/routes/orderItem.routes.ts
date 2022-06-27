const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/user-check-auth");

import OrderItemController from "../controllers/orderItem.controller";

router.delete('/deleteMany', checkAuth, OrderItemController.deleteManyRecord);

router
  .route("/")
  .get(checkAuth, OrderItemController.getAllRecords);

router
  .route("/:id")
  .get(checkAuth, OrderItemController.getOneRecord)
  .put(checkAuth, OrderItemController.updateRecord)
  .delete(checkAuth, OrderItemController.deleteRecord);

module.exports = router;
