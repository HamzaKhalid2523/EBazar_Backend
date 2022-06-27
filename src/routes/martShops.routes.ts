const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

import MartShopsController from "../controllers/martShops.controller";

router.put("/:id/updateStatus", MartShopsController.updateShopStatus);

router
  .route("/")
  .get(checkAuth, MartShopsController.getAllRecords)
  .post(checkAuth, MartShopsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, MartShopsController.getOneRecord)
  .put(checkAuth, MartShopsController.updateRecord)
  .delete(checkAuth, MartShopsController.deleteRecord);

module.exports = router;
