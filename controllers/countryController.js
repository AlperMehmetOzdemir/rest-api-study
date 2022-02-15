import asyncHandler from "express-async-handler";
import Country from "../models/countryModel.js";

/*
  @desc Get all countries
  @route GET /countries
*/

const getCountries = asyncHandler(async (req, res) => {
  const countries = await Country.find();

  res.json({ countries });
});

export { getCountries };
