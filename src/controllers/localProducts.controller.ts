const LocalProductsModel = require("../models/localProducts.model");
const factoryController = require("./factoryController");

class LocaoProductsController {
  getAllRecords = factoryController.getAll(LocalProductsModel, { path: "shop seller rating" });
  getOneRecord = factoryController.getOne(LocalProductsModel, { path: "shop seller rating" });
  createNewRecord = factoryController.createOne(LocalProductsModel);
  updateRecord = factoryController.updateOne(LocalProductsModel);
  deleteRecord = factoryController.deleteOne(LocalProductsModel);
}

export default new LocaoProductsController();
