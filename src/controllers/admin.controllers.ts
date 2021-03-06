import { NextFunction, Request, Response } from "express";

const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");
const redis = require("../config/redis").authRedis;

const AdminModel = require("../models/admins.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

class AdminController {
  getAllRecords = factoryController.getAll(AdminModel, null, "email");
  getOneRecord = factoryController.getOne(AdminModel);
  createNewRecord = factoryController.createOne(AdminModel);
  updateRecord = factoryController.updateOne(AdminModel);
  deleteRecord = factoryController.deleteOne(AdminModel);
  
  loginAdmin = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = body?.user?.toLowerCase();

    if (!user) {
      return next(new AppError('Invalid Input Data.', 400));
    }

    let result = await AdminModel.find({"$or": [{'email': user}, {'phone': user}]}).select("+password");
    result = result[0];

    if (!result) {
      return next(new AppError('This user doesnot exists.', 401));
    }

    if (result.is_deleted || !result.status) {
      return next(new AppError('User account is disabled. Please login Again!', 401));
    }
    
    if (bcrypt.compareSync(body.password, result.password)) {

      result.password = undefined;

      const uuid = uuidv4();
      const token = `admin-${result.email}-${uuid}`;
      const user = {
        token,
        data: result,
      };
      req['user'] = result;

      const expiryTime: any = parseInt((+new Date() / 1000).toString()) + parseInt(process.env.authTokenExpiry || '3600');
      await redis.set(user.token, JSON.stringify(result));
      redis.expireat(user.token, expiryTime );

      res.set("Authorization", JSON.stringify({ token }));

      res.send({
        message: "Successfully Logged in",
        user: result,
        token,
      });
    } else {
      return next(new AppError('Wrong user or password', 401));
    }
  });

  changePassword = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const body = req.body;
    const _id = req.params._id;

    if(!body.currentPassword || !body.newPassword) {
      return next(new AppError('Password Missing', 404));
    }
    
    const user = await AdminModel.findOne({ _id: _id });
    if(!user) {
      return next(new AppError('This user doesnot exists.', 401));
    }
    if (user.is_deleted || !user.status) {
      return next(new AppError('User is inactive.', 401));
    }
    
    if (bcrypt.compareSync(body.currentPassword, user.password)) {
      user.password = body.newPassword;
      const result = await user.save();

      if(result) {
        res.send({
          message: "Password Changed Successfully!",
          data: user,
        });
      } else {
        return res.status(500).send(result);
      }
    } else {
      return next(new AppError('Invalid Password!', 400));
    }
  });

  logout = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    await redis.del(token);

    
    res.status(204).json({
      status: 'success',
      message: 'User is logged out'
    });
  });
}

export default new AdminController();
