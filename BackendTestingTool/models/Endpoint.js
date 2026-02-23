
import mongoose from 'mongoose';

const endpointSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, default: 'GET' },
  headers: { type: Object, default: {} },
  body: { type: String, default: '' },
  authType: {
    type: String,
    enum: ['none', 'bearer', 'apikey', 'basic'],
    default: 'none',
  },
  token: { type: String },
  mode: {
    type: String,
    enum: ['production', 'staging', 'testing', 'dry-run'],
    default: 'dry-run',
  },
  expectedStatus: { type: Number, default: 200 },
  maxResponseTime: { type: Number, default: 2000 },
  intervalMinutes: { type: Number, default: 10 },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Endpoint', endpointSchema);