import app from './app';
import { initializeDatabase } from './config/database';
import logger from './config/logger';
const PORT = process.env.PORT || 8080;
initializeDatabase();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
