
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/ping', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ message: 'url query parameter is required' });
  }

  const start = Date.now();
  try {
    const response = await axios.get(url, { timeout: 8000 });
    const time = Date.now() - start;
    res.json({
      status: response.status,
      timeMs: time,
      snippet: JSON.stringify(response.data).slice(0, 300),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      timeMs: Date.now() - start,
    });
  }
});

export default router;