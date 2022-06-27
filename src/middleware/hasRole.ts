import { NextFunction, Request, Response } from "express";

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const checkRole = (role: Number) => {
  return catchAsync(async (req: any, res: Response, next: NextFunction) => {
    let user = req['user'];

    if (user.role === "admin") return next();

    return next(new AppError('User Authentication Failed. Please login to get access!', 403));
  });
};

module.exports = checkRole;
