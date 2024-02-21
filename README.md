# Node/Express API for Netlify

This repository contains instructions and code to create a Node/Express API for deployment on Netlify.

## Steps to Create Node/Express API for Netlify:

1. Install necessary packages:
   
   ```bash
   npm i express serverless-http @netlify/functions @types/express
   ```

2. Create the API file:
   
   Navigate to `YOUR_BASE_DIRECTORY/netlify/functions/api.js` and add the following code:

   ```typescript
   import express, { Router } from "express";
   import serverless from "serverless-http";

   const api = express();

   const router = Router();
   router.get("/hello", (req, res) => res.send("Hello World!"));

   api.use("/api/", router);

   export const handler = serverless(api);
   ```

3. Create a Netlify TOML file:

   Navigate to `YOUR_BASE_DIRECTORY/netlify.toml` and add the following configuration:

   ```toml
   [functions]
   external_node_modules = ["express"]
   node_bundler = "esbuild"

   [[redirects]]
   force = true
   from = "/api/*"
   status = 200
   to = "/.netlify/functions/api/:splat"
   ```

4. Install Netlify CLI globally:
   
   ```bash
   npm install netlify-cli -g
   ```

5. To run/start the project:
   
   Execute the following command in your terminal:

   ```bash
   netlify dev
   ```

## Notes:

- This setup utilizes Express.js for building the API.
- `serverless-http` is used to wrap the Express app for compatibility with Netlify Functions.
- The Netlify TOML file configures redirection of API routes to the appropriate Netlify function.
- Netlify CLI is required to locally develop and test the project.


## Live Preview : https://testnodeapifornetlify.netlify.app/

Happy coding! 🚀
