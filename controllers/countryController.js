import asyncHandler from "express-async-handler";
import Country from "../models/countryModel.js";

/*
  @desc Get all countries
  @route GET /countries
*/
const getCountries = asyncHandler(async (req, res) => {
  const region = req.query.region;
  try {
    const countries = await Country.find(region ? { region } : {});
    res.json({ countries });
  } catch (err) {
    throw new Error(`[Error] ${error.message}`);
  }
});

export { getCountries };
