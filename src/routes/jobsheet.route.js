import { Router } from "express";
import { CreateJobsheet } from "../models/controllers/jobsheet.model.js";
import { ensureAuthenticated } from "../Middleware/authenticate.js";

const router = new Router();
router.route("/create").post(ensureAuthenticated, CreateJobsheet);

export default router;
