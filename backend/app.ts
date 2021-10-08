import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import db from './app/db/db';
import * as routes from './app/routes/routes';

dotenv.config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app = express();
app.use(express.json());
db().connect();
routes.setRoutes(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
