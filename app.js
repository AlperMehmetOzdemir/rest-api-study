// Imports
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config.js/db.js";

// Route Imports
import countryRoutes from "./routes/countryRoutes.js";

// Setup
dotenv.config();
connectDb();

const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is active.");
});

// API Routes
app.use("/countries", countryRoutes);

// Custom Middleware

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
