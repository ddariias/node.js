import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/forgot-password", authController.forgotPasswordSendEmail);
router.post(
  "/forgot-password",
  authMiddleware.checkActionToken,
  authController.forgotPasswordSetNew,
);

export const AuthRouter = router;
