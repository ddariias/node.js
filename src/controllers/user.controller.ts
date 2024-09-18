import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as IUser;
      const users = await userService.create(data);
      return res.send(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await userService.getById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const data = req.body as IUser;
      const users = await userService.updateById(userId, data);

      res.send(users);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.deleteById(userId);
      res.status(204).send("User delete");
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
