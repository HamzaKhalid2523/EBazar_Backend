import { NextFunction, Request, Response } from "express";

const OrderItemModel = require("../models/orders-item.model");
const factoryController = require("./factoryController");

class OrderItemController {
  getAllRecords = factoryController.getAll(OrderItemModel, {path: 'product.localProduct product.martProduct shop.localShop shop.martShop user seller rating',
    populate: {
      path: 'deliverAddress',
      model: 'Address'
    } 
  });
  getOneRecord = factoryController.getOne(OrderItemModel, {path: 'product.localProduct product.martProduct shop.localShop shop.martShop user seller rating',
    populate: {
      path: 'deliverAddress',
      model: 'Address'
    } 
  });
  updateRecord = factoryController.updateOne(OrderItemModel);
  deleteRecord = factoryController.deleteOne(OrderItemModel);
  deleteManyRecord = factoryController.deleteMany(OrderItemModel);
}

export default new OrderItemController();
