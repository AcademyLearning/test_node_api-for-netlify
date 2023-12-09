import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();
const cors = require('cors')

api.use(cors({
    origin:"http://localhost:5173"
}));


router.get("/", (req, res) => {
    res.send("Hello User. API started => Try : /hello or /data");
});

router.get("/hello", (req, res) => res.send("Hello User!"));


router.get('/data', (req, res) => {
    res.json({ message: 'This is a sample API route' });
});


api.use("/", router);

export const handler = serverless(api);