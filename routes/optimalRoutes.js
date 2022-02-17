import express from "express";
const router = express.Router();

import { getOptimal } from "../controllers/optimalController.js";

router.route("/").get(getOptimal);

export default router;
