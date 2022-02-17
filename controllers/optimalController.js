import asyncHandler from "express-async-handler";
import axios from "axios";

/*
  @desc Get the optimal country distribution for each salesrep
  @route GET /optimal
*/
const getOptimal = asyncHandler(async (req, res) => {
  const optimalDistribution = [];
  const countryData = [];
  const salesrepData = {};
  const countryByRegion = {};

  // get country data
  try {
    const apiResponse = await axios.get(
      `http://localhost:${process.env.PORT || 3000}/countries`
    );
    countryData.push(...apiResponse.data.countries);
  } catch (err) {
    throw new Error(`[Error] ${error.message}`);
  }

  // get salesrep data for each region
  try {
    const apiResponse = await axios.get(
      `http://localhost:${process.env.PORT || 3000}/salesrep`
    );
    // only store the minSalesReq data by region 
    for (let data of apiResponse.data) {
      salesrepData[data.region] = data.minSalesReq;
    }
  } catch (err) {
    throw new Error(`[Error] ${error.message}`);
  }

  // store conuntries in (region, countries), key value pairs
  for (let country of countryData) {
    if (countryByRegion.hasOwnProperty(country.region)) {
      countryByRegion[country.region].push(country.name);
    } else {
      countryByRegion[country.region] = [country.name];
    }
  }

  // assign an even(ish) amount of countries for each salesrep
  for (const [region, countries] of Object.entries(countryByRegion)) {
    const countryLists = [];
    let chunkSize;
    let countDown = salesrepData[region];

    // split the countries evenly for each salesrep
    while (countDown) {
      chunkSize = Math.ceil(countries.length / countDown);
      countryLists.push(countries.splice(0, chunkSize));
      countDown--;
    }

    // store region, countryList and countryCount for each salesrep for final response
    for (let i = 0; i < countryLists.length; i++) {
      optimalDistribution.push({
        region,
        countryList: countryLists[i],
        countryCount: countryLists[i].length,
      });
    }
  }

  res.json(optimalDistribution);
});

export { getOptimal };
