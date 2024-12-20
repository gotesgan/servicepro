import { Router } from "express";
import { registerUser } from "../models/user.model.js";
import { loginrUser } from "../models/user.model.js";
import { logoutUser } from "../models/user.model.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/login").post(loginrUser);

export default router;
