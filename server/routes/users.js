import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.js";
import catchAsync from "../utils/catchAsync.js";

const router = Router();

router.route("/register").post(catchAsync(createUser));

router.route("/login").post(catchAsync(loginUser));

export default router;
