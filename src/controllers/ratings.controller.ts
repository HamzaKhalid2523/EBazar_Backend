import { NextFunction, Request, Response } from "express";

const RatingModel = require("../models/ratings.model");
const OrderItemModel = require("../models/orders-item.model");
const MartProductModel = require("../models/martProducts.model");
const LocalProductModel = require("../models/localProducts.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");

class RatingController {
  getAllRecords = factoryController.getAll(RatingModel);
  getOneRecord = factoryController.getOne(RatingModel);
  updateRecord = factoryController.updateOne(RatingModel);
  deleteRecord = factoryController.deleteOne(RatingModel);
  deleteManyRecord = factoryController.deleteMany(RatingModel);

  createNewRecord = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    const body = req.body;
    let product = null;

    let result = new RatingModel(body);
    await result.save();

    let order = await OrderItemModel.findById(body?.order);
    order.rating = result._id;
    await order.save();

    if(body?.productType === 'mart') {
      product = await MartProductModel.findById(body?.product);
    } else {
      product = await LocalProductModel.findById(body?.product);
    }

    if(product?.rating && product?.rating?.length) {
      product.rating.push(result._id);
    } else {
      product.rating = [result._id];
    }
    
    product.totalRating += body.rating;
    product.save();

    res.send({
      message: "Successfully Created Record!",
      data: result
    });
  });
}

export default new RatingController();
