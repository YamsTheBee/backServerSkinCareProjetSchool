//userRouter.js
import { Router } from "express";
const router = Router();

import {
	register,
	login,
	getUser,
	updateUser,
	deleteUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/register", register);
router.post("/login", login);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
