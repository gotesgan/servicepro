import { Router } from "express";
import { registerUser } from "../models/user.model.js";

const router = Router();
router.route("/register").post(registerUser);

export default router;
