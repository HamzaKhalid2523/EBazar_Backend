import { NextFunction, Request, Response } from "express";

const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");
const redis = require("../config/redis").authRedis;

const UsersModel = require("../models/users.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilio = require("twilio")(accountSid, authToken);

class UserController {
  getAllRecords = factoryController.getAll(UsersModel, {path: 'deliverAddress'}, "email");
  getOneRecord = factoryController.getOne(UsersModel, {path: 'deliverAddress'});
  createNewRecord = factoryController.createOne(UsersModel);
  updateRecord = factoryController.updateOne(UsersModel);
  deleteRecord = factoryController.deleteOne(UsersModel);
  
  signupSeller = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    if (!req.body.phone) {
      return next(
        new AppError("Please provide phone number.", 400)
      );
    }
    if (!req.body.code) {
      return next(new AppError("Please provide verification code.", 400));
    }
  
    const phone = "+" + req.body.phone;
    let phoneData;

    try {
      phoneData = await twilio.verify
        .services(process.env.SERVICE_ID)
        .verificationChecks.create({
          to: phone,
          code: req.body.code,
        });
    } catch(error) {
      return next(new AppError("There was an error verifying the code. Try again later!"));
    }
  
    if (!phoneData) {
      return next(new AppError("There was an error verifying the code. Try again later!"));
    }
  
    if (phoneData.status === "approved") {
      const body = req.body;
  
      let doc = await UsersModel.find({"$or": [{'email': body.email}, {'phone': body.phone}]});
      doc = doc[0];
  
      if (doc) {
        return next(new AppError('Email or Phone No Already Exists!', 401));
      }
  
      let result = new UsersModel(body);
      await result.save();
  
      result.password = undefined;
  
      const uuid = uuidv4();
      const token = `client-${result.email}-${uuid}`;
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
      return next(new AppError("Invalid Code. Try again later!"));
    }
  });
  
  loginSeller = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = body?.user?.toLowerCase();

    if (!user) {
      return next(new AppError('Invalid Input Data.', 400));
    }

    let result = await UsersModel.find({"$or": [{'email': user}, {'phone': user}]}).select("+password").populate({path: 'deliverAddress'});
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
      const token = `client-${result.email}-${uuid}`;
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
    
    const user = await UsersModel.findOne({ _id: _id });
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

  getVerificationCode = catchAsync(async (req, res, next) => {
    if (!req.body.phone) {
      return next(
        new AppError("Please provide phone number.", 400)
      );
    }
  
    const phone = "+" + req.body.phone;
  
    const data = await twilio.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: phone,
        channel: "sms",
      });
  
    if (!data) {
      return next(
        new AppError("There was an error sending the code. Try again later!"),
        500
      );
    }
  
    res.status(200).json({
      status: "success",
      message: "Code sent to mobile number!",
      data: {
        data,
      },
    });
  });
  
  verifyCode = catchAsync(async (req, res, next) => {
    if (!req.body.phone) {
      return next(
        new AppError("Please provide phone number.", 400)
      );
    }
    if (!req.body.code) {
      return next(new AppError("Please provide verification code.", 400));
    }
  
    const phone = "+" + req.body.phone;
  
    const data = await twilio.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: phone,
        code: req.body.code,
      });
  
    if (!data) {
      return next(
        new AppError("There was an error verifying the code. Try again later!"),
        500
      );
    }
  
    if (data.status === "approved") {
      res.status(200).json({
        status: "success",
        message: "Code Verified!",
        data: {
          data,
        },
      });
    } else {
      return next(new AppError("Invalid Code. Try again later!"), 401);
    }
  });
}

export default new UserController();
