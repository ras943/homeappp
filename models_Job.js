const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  description: String,
  images: [String],
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
  },
  scheduledAt: Date,
  isUrgent: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'matched', 'completed'], default: 'pending' },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bids: [{ provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number }],
}, { timestamps: true });

JobSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Job', JobSchema);