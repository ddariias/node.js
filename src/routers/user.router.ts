import { Router } from "express";

import { userController } from "../controllers/user.controller";
import {userMiddleware} from "../middleware/user.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.isBodyValid(UserValidator.create), userController.create);
router.get("/:userId", userMiddleware.isIdValid("userId"), userController.getById);
router.put("/:userId", userMiddleware.isIdValid("userId"), userMiddleware.isBodyValid(UserValidator.update), userController.updateById);
router.delete("/:userId", userMiddleware.isIdValid("userId"), userController.deleteById);

export const UserRouter = router;
