
import cron from 'node-cron';
import axios from 'axios';
import Endpoint from '../models/Endpoint.js';
import CheckLog from '../models/CheckLog.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const performCheck = async (endpoint) => {
  let start = Date.now();
  let statusCode = 0;
  let responseTime = 0;
  let success = false;
  let errorMessage = '';
  let responseSnippet = '';

  try {
    if (endpoint.mode === 'dry-run') {
      statusCode = Math.random() > 0.05 ? 200 : 503;
      responseTime = Math.floor(Math.random() * 800) + 150;
      success = statusCode === 200 && responseTime <= endpoint.maxResponseTime;
      responseSnippet = 'Dry-run simulation';
    } else {
      const config = {
        method: endpoint.mode === 'testing' ? 'GET' : endpoint.method.toLowerCase(),
        url: endpoint.url,
        headers: { ...endpoint.headers },
        timeout: 12000,
      };

      // Attach auth token
      if (endpoint.authType === 'bearer' && endpoint.token) {
        config.headers.Authorization = `Bearer ${endpoint.token}`;
      } else if (endpoint.authType === 'apikey' && endpoint.token) {
        config.headers['X-API-Key'] = endpoint.token;
      } else if (endpoint.authType === 'basic' && endpoint.token) {
        config.headers.Authorization = `Basic ${endpoint.token}`;
      }

      // Body only if not testing mode and not GET
      if (
        ['post', 'put', 'patch'].includes(config.method) &&
        endpoint.body &&
        endpoint.mode !== 'testing'
      ) {
        config.data = JSON.parse(endpoint.body);
      }

      const response = await axios(config);
      statusCode = response.status;
      responseTime = Date.now() - start;
      success =
        statusCode === endpoint.expectedStatus &&
        responseTime <= endpoint.maxResponseTime;

      responseSnippet = JSON.stringify(response.data ?? {}).slice(0, 200);
    }
  } catch (err) {
    errorMessage = err.message;
    statusCode = err.response?.status || 0;
    responseTime = Date.now() - start;
  }

  // Save log
  await CheckLog.create({
    endpoint: endpoint._id,
    statusCode,
    responseTime,
    success,
    errorMessage,
    mode: endpoint.mode,
    responseSnippet,
  });

  // 🚫 EMAIL ALERT TEMPORARILY DISABLED
  /*
  if (!success) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'your-email@example.com',
      subject: `[API Alert] ${endpoint.name} failed`,
      text: `URL: ${endpoint.url}
Mode: ${endpoint.mode}
Status: ${statusCode}
Time: ${responseTime}ms
Error: ${errorMessage}`,
    });
  }
  */
};

const startHealthChecks = () => {
 
  cron.schedule('*/10 * * * *', async () => {
    console.log('Running API health checks...');
    const endpoints = await Endpoint.find();
    for (const ep of endpoints) {
      await performCheck(ep);
    }
  });

  console.log('Health check scheduler started (every 10 minutes)');
};

export default startHealthChecks;