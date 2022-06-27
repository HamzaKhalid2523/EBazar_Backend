import { NextFunction, Request, Response } from "express";

module.exports = (fn: any) => {
    return (req: any, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
    };
};