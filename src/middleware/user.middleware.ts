// import { NextFunction, Request, Response } from "express";
//
// import { ApiError } from "../errors/api.error";
//
// class UserMiddleware {
//   public async findByIdOrThrow(
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) {
//     try {
//       const { userId } = req.params;
//       const user = users[+userId];
//
//       if (!user) {
//         throw new ApiError("User not found", 400);
//       }
//       next();
//     } catch (e) {
//       next(e);
//     }
//   }
// }
//
// export const userMiddleware = new UserMiddleware();
