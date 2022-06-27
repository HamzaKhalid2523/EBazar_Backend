import { NextFunction, Request, Response } from "express";

const SellerModel = require("../models/sellers.model");
const LocalShopsModel = require("../models/localShops.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");

class LocalShopsController {
  getAllRecords = factoryController.getAll(LocalShopsModel, { path: "seller" }, "companyName");
  getOneRecord = factoryController.getOne(LocalShopsModel);
  updateRecord = factoryController.updateOne(LocalShopsModel);
  deleteRecord = factoryController.deleteOne(LocalShopsModel);
  
  createNewRecord = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const body = req.body;
    body.seller = user?._id || null;

    let result = new LocalShopsModel(body);
    await result.save();

    let userResult = await SellerModel.findById(user?._id);
    userResult.shop = { localShop: result._id, shopType: 'local' };
    await userResult.save();

    res.send({
      message: "Successfully Logged in",
      data: result,
      seller: userResult
    });
  });
}

export default new LocalShopsController();
