const CartModel = require("../models/cart.model");
const factoryController = require("./factoryController");

class CartController {
  getAllRecords = factoryController.getAll(CartModel, 
    { path: "product.localProduct product.martProduct shop.localShop shop.martShop user seller" }
  );
  getOneRecord = factoryController.getOne(CartModel, 
    { path: "product.localProduct product.martProduct shop.localShop shop.martShop user seller" }
  );
  createNewRecord = factoryController.createOne(CartModel);
  updateRecord = factoryController.updateOne(CartModel);
  deleteRecord = factoryController.deleteOne(CartModel);
  deleteManyRecord = factoryController.deleteMany(CartModel);
}

export default new CartController();
