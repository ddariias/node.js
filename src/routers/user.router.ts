import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middleware/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);

router.get("/me", userMiddleware.isIdValid("userId"), userController.getById);
router.put(
  "/me",
  userMiddleware.isIdValid("userId"),
  userMiddleware.isBodyValid(UserValidator.update),
  userController.updateMe,
);
router.delete(
  "/me",
  userMiddleware.isIdValid("userId"),
  userController.deleteMe,
);
router.get(
  "/:userId",
  userMiddleware.isIdValid("userId"),
  userController.getById,
);
export const UserRouter = router;
