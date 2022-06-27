const OriginalShopsModel = require("../models/originalShops.model");
const factoryController = require("./factoryController");

class OriginalShopsController {
  getAllRecords = factoryController.getAll(OriginalShopsModel, null, "email");
  getOneRecord = factoryController.getOne(OriginalShopsModel);
  createNewRecord = factoryController.createOne(OriginalShopsModel);
  updateRecord = factoryController.updateOne(OriginalShopsModel);
  deleteRecord = factoryController.deleteOne(OriginalShopsModel);
}

export default new OriginalShopsController();
