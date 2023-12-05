import express, { Router } from "express";
import serverless from "serverless-http";

const {
  connectToDB,
  getStuInfoCollection,
  closeDB,
  testDatabaseConnection,
} = require("../utils/db");

const api = express();

const router = Router();

// Define a route for the testdbcon endpoint
router.get("/testdbcon", async (req, res) => {
  try {
    // Call the function you want to expose
    const result = await testDatabaseConnection();

    // Send the data returned by connectToDB function
    res.status(200).json({ message: "API endpoint success", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in API endpoint", details: error.message });
  }
});

api.use("/test/", router);

export const handler = serverless(api);
