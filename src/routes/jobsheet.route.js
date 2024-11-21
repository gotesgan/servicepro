import { Router } from "express";
import { CreateJobsheet } from "../models/controllers/jobsheet.model.js";
import { ensureAuthenticated } from "../Middleware/authenticate.js";
import { Updatejobsheet } from "../models/jobsheet.model.js";
const router = new Router();
router.route("/create").post(ensureAuthenticated, CreateJobsheet);
router.route("/status").post(ensureAuthenticated, Updatejobsheet);

export default router;