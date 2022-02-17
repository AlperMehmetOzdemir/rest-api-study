import express from "express";
const router = express.Router();

import {getSalesrep} from "../controllers/salesrepController.js"

router.route("/").get(getSalesrep);

export default router;
