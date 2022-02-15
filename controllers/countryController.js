import asyncHandler from "express-async-handler";
import Country from "../models/countryModel.js";

/*
  @desc Get all countries
  @route GET /countries
*/

const getCountries = asyncHandler(async (req, res) => {
  const region = req.query.region;
  const countries = await Country.find(region ? {region} : {});

  res.json({ countries });
});

export { getCountries };
