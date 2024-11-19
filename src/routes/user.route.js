import { Router } from "express";
import { registerUser } from "../models/user.model.js";
import { loginrUser } from "../models/user.model.js";

// import passport from "passport";
// import { passportConfig } from "../UTILS/passportConfig.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginrUser);
export default router;
