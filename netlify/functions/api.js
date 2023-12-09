import express, { Router } from 'express';
import serverless from 'serverless-http';

const api = express();
const router = Router();
const cors = require('cors')

api.use(cors({
    origin:"http://localhost:5173"
}));

router.get('/', (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.send('Hello User. API started => Try : /hello or /data');
});

router.get('/hello', (req, res) => res.send('Hello User!'));

router.get('/data', (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  res.json({ message: 'This is a sample API route' });
});

api.use('/', router);

export const handler = serverless(api);
