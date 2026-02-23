
import express from 'express';
import protect from '../middleware/auth.js';
import {
  createEndpoint,
  getMyEndpoints,
  getEndpoint,
  updateEndpoint,
  deleteEndpoint,
  getEndpointLogs,
  runManualCheck,
} from '../controllers/endpointController.js';

const router = express.Router();

router.use(protect); 

router.route('/')
  .post(createEndpoint)
  .get(getMyEndpoints);

router.route('/:id')
  .get(getEndpoint)
  .put(updateEndpoint)
  .delete(deleteEndpoint);

  router.get('/:id/logs', protect, getEndpointLogs);

  router.post('/:id/check-now', protect, runManualCheck);

export default router;