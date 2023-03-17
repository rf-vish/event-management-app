import { Router } from "express";
import { getAllEvents, createEvent } from "../controllers/events.js";
import catchAsync from "../utils/catchAsync.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

//isLoggedIn,
router.route("/").get(verifyUser, getAllEvents).post(catchAsync(createEvent));

export default router;
