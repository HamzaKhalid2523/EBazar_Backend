const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/user-check-auth");

import AddressController from "../controllers/address.controller";

router.delete('/deleteMany', checkAuth, AddressController.deleteManyRecord);

router
  .route("/")
  .get(checkAuth, AddressController.getAllRecords)
  .post(checkAuth, AddressController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, AddressController.getOneRecord)
  .put(checkAuth, AddressController.updateRecord)
  .delete(checkAuth, AddressController.deleteRecord);

module.exports = router;
