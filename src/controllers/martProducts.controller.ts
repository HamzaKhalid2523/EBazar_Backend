const MartProductsModel = require("../models/martProducts.model");
const factoryController = require("./factoryController");

class MartProductsController {
  getAllRecords = factoryController.getAll(MartProductsModel, { path: "shop seller rating" });
  getOneRecord = factoryController.getOne(MartProductsModel, { path: "shop seller rating" });
  createNewRecord = factoryController.createOne(MartProductsModel);
  updateRecord = factoryController.updateOne(MartProductsModel);
  deleteRecord = factoryController.deleteOne(MartProductsModel);
}

export default new MartProductsController();
