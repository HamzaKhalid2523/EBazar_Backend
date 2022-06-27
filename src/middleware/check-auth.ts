import { NextFunction, Request, Response } from "express";

const redis = require("../config/redis").authRedis;
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

module.exports = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  if(req.query.endUser) {
    delete req.query.endUser;
    return next();
  }
  const token = req.headers.authorization;
  if (!token) {
    return next(new AppError('User Authentication Failed. Please login to get access!', 401));
  }

  const user = await redis.get(token);
  if (!user) {
    return next(new AppError('User Authentication Failed. Please login to get access!', 401));
  }

  req['user'] = JSON.parse(user);
  if (req['user'].is_deleted || !req['user'].status) {
    return next(new AppError('User account is disabled. Please login to get access!', 401));
  }
  // req['user'] = {
  //   username:'zunnurain',
  //   _id:'620cee464ee45e4f4016edb9',
  //   role_type:"superadmin"
  // };
  next();
});
