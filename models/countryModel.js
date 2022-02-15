import mongoose, { mongo } from "mongoose"

const countrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  region: {
    type: String,
    required: true
  }
})

const Country = mongoose.model("Country", countrySchema);

export default Country;