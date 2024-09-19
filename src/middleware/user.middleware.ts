import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import {ObjectSchema} from "joi";

class UserMiddleware {
  public isIdValid(key:string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid id", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyValid(validator:ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
      req.body = await validator.validateAsync(req.body)
        next();
      } catch (e) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
