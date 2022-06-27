const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/user-check-auth");

import RatingsController from "../controllers/ratings.controller";

router.delete('/deleteMany', checkAuth, RatingsController.deleteManyRecord);

router
  .route("/")
  .get(checkAuth, RatingsController.getAllRecords)
  .post(checkAuth, RatingsController.createNewRecord);

router
  .route("/:id")
  .get(checkAuth, RatingsController.getOneRecord)
  .put(checkAuth, RatingsController.updateRecord)
  .delete(checkAuth, RatingsController.deleteRecord);

module.exports = router;
