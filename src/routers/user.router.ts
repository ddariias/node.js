import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get("/me", authMiddleware.checkRefreshToken, userController.getMe);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid("userId"),
  userMiddleware.isBodyValid(UserValidator.update),
  userController.updateMe,
);
router.delete(
  "/me",
  authMiddleware.checkAccessToken,
  userMiddleware.isIdValid("userId"),
  userController.deleteMe,
);
router.get(
  "/:userId",
  userMiddleware.isIdValid("userId"),
  userController.getById,
);
export const UserRouter = router;
