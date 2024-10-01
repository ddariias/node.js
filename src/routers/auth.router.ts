import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenEnum } from "../enums/action-token.enum";
import { authMiddleware } from "../middleware/auth.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/forgot-password", authController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkActionToken(ActionTokenEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSetNew,
);
router.post(
  "/change-password",
  authMiddleware.checkAccessToken,
  userMiddleware.isBodyValid(UserValidator.changePassword),
  authController.changePassword,
);
router.post(
  "/verify",
  authMiddleware.checkActionToken(ActionTokenEnum.VERIFY_EMAIL),
  authController.verify,
);

export const AuthRouter = router;
