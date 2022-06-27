import { NextFunction, Request, Response } from "express";

const AddressModel = require("../models/address.model");
const UsersModel = require("../models/users.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");

class AddressController {
  getAllRecords = factoryController.getAll(AddressModel);
  getOneRecord = factoryController.getOne(AddressModel);
  updateRecord = factoryController.updateOne(AddressModel);
  deleteRecord = factoryController.deleteOne(AddressModel);
  deleteManyRecord = factoryController.deleteMany(AddressModel);

  createNewRecord = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const body = req.body;

    let result = new AddressModel(body);
    await result.save();

    let userResult = await UsersModel.findById(user?._id);
    userResult.deliverAddress = result._id;
    await userResult.save();

    res.send({
      message: "Successfully Created Record!",
      data: result
    });
  });
}

export default new AddressController();
