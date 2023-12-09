import express, { Router } from "express";
import serverless from "serverless-http";

const { testDatabaseConnection } = require("../utils/db");
const corsMiddleware = require("../middleware/corsMiddleware");

const api = express();
const router = Router();

// Apply the CORS middleware globally
api.use(corsMiddleware);

// Allowed origins in same file

// const cors = require('cors')

// api.use(cors({
//     origin:"http://localhost:5173"
// }));

// Define a route for the testdbcon endpoint
router.get("/testdbcon", async (req, res) => {
  try {
    // Call the function you want to expose
    const result = await testDatabaseConnection();

    // Send the data returned by connectToDB function
    res.status(200).json({ message: "API endpoint success =>", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in API endpoint", details: error.message });
  }
});

api.use("/test/", router);

export const handler = serverless(api);
