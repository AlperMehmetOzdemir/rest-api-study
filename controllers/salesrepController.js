import asyncHandler from "express-async-handler";
import axios from "axios";

/*
  @desc Get salesrep requirements for all countries
  @route GET /salesrep
*/
const getSalesrep = asyncHandler(async (req, res) => {
  const salesrepMinimumCountriesAssigned = 3;
  const salesrepMaximumCountriesAssigned = 7;
  let countryData;
  const salesrepRequirements = [];
  const countryCountByRegion = {};
  try {
    const apiResponse = await axios.get(
      `http://localhost:${process.env.PORT || 3000}/countries`
    );
    countryData = apiResponse.data.countries;
  } catch (err) {
    throw new Error(`[Error] ${error.message}`);
  }

  // find the number of countries in each region
  for (let country of countryData) {
    if (countryCountByRegion.hasOwnProperty(country.region)) {
      countryCountByRegion[country.region] += 1;
    } else {
      countryCountByRegion[country.region] = 1;
    }
  }

  // calculate salesrep requirements for each region
  // and store it in "salesrepRequirements"
  for (const [region, count] of Object.entries(countryCountByRegion)) {
    const minSalesReq = Math.ceil(count / salesrepMaximumCountriesAssigned);
    const maxSalesReq = Math.ceil(count / salesrepMinimumCountriesAssigned);

    salesrepRequirements.push({
      region,
      minSalesReq,
      maxSalesReq,
    });
  }

  res.json(salesrepRequirements);
});

export { getSalesrep };
