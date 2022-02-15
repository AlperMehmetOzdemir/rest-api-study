import express from "express";
const router = express.Router();

import { getCountries } from "../controllers/countryController.js";

router.route("/").get(getCountries);

export default router;
