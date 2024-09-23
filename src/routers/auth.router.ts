import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  userMiddleware.isBodyValid(UserValidator.create),
  authController.register,
);
router.post("/login", authController.login);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const AuthRouter = router;
