import express from 'express';
import dotenv from 'dotenv';
import path from 'path';  // For handling static file paths

import router from './routes/index.js';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;  // Use the port from .env, default to 3001

app.use(express.json());
app.use(express.static(path.resolve('../client/dist/')));  // Serve static files from the 'client/dist' directory

// API routes
app.use('/', router);

// Sync database and start the server
sequelize.sync({ force: false })  // You can set `force: true` only in dev environment
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
    process.exit(1);  // Exit with failure status
  });

// Serve index.html for non-API routes (if needed)
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'));  // Adjust based on your client build folder location
});
