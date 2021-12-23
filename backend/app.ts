import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import * as routes from './app/routes/routes';

dotenv.config();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const app = express();
app.use(express.json(), fileUpload());
routes.setRoutes(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
