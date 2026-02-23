
import mongoose from 'mongoose';

const checkLogSchema = new mongoose.Schema({
  endpoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endpoint',
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  statusCode: { type: Number, default: 0 },
  responseTime: { type: Number, default: 0 },
  success: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  mode: { type: String, required: true },
  responseSnippet: { type: String, default: '' },
});

export default mongoose.model('CheckLog', checkLogSchema);