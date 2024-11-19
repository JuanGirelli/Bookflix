
const forceDatabaseRefresh = false;

import express from 'express';
import dotenv from 'dotenv';

import router from './routes/index.js';

import { sequelize } from './models/index.js';

dotenv.config();

const app = express();

const PORT = 3001;

app.use(express.json());

app.use(express.static('../client/dist'));


app.use('/', router);


sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});