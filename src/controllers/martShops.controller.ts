import { NextFunction, Request, Response } from "express";

const SellerModel = require("../models/sellers.model");
const MartShopsModel = require("../models/martShops.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");

class MartShopsController {
  getAllRecords = factoryController.getAll(MartShopsModel, { path: "seller" }, "companyName");
  getOneRecord = factoryController.getOne(MartShopsModel);
  updateRecord = factoryController.updateOne(MartShopsModel);
  deleteRecord = factoryController.deleteOne(MartShopsModel);
  
  createNewRecord = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const body = req.body;
    body.seller = user?._id || null;

    let result = new MartShopsModel(body);
    await result.save();

    let userResult = await SellerModel.findById(user?._id);
    userResult.shop = { martShop: result._id, shopType: 'mart' };
    await userResult.save();

    res.send({
      message: "Shop Created Successfully! Admin will notify shortly.",
      data: result,
      seller: userResult
    });
  });
  
  updateShopStatus = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const seller = req.body.seller;
    const status = req.body.status;

    if(status) {
      let result = await MartShopsModel.findById(id);
      result.shopExists = 'Verified';
      result.isVerified = true;
      await result.save();

      let userResult = await SellerModel.findById(seller);
      userResult.isVerified = true;
      await userResult.save();
    } else {
      let result = await MartShopsModel.findById(id);
      result.shopExists = 'Not Verified';
      await result.save();  
    }

    res.send({
      message: "Status Updated Successfully!"
    });
  });
}

export default new MartShopsController();
