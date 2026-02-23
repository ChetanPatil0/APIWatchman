
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import startHealthChecks from './utils/cron.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      startHealthChecks();
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();