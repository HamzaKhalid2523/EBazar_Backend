const ProductsModel = require("../models/products.model");
const factoryController = require("./factoryController");

class ProductsController {
  getAllRecords = factoryController.getAll(ProductsModel);
  getOneRecord = factoryController.getOne(ProductsModel);
  createNewRecord = factoryController.createOne(ProductsModel);
  updateRecord = factoryController.updateOne(ProductsModel);
  deleteRecord = factoryController.deleteOne(ProductsModel);
}

export default new ProductsController();
