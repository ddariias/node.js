import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import {
  IForgotPassword,
  IForgotPasswordSet,
  ILogin,
  IUser,
} from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await authService.register(req.body);
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as ILogin;
      const users = await authService.login(data);
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.res.locals.refreshToken as string;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

      const result = await authService.refresh(token, jwtPayload);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPasswordSendEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = req.body as IForgotPassword;
      await authService.forgotPasswordSendEmail(data);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async forgotPasswordSetNew(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const data = req.body as IForgotPasswordSet;
      await authService.forgotPasswordSetNew(data, jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
