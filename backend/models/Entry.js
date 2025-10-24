const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  mood: { type: String, required: true },
  energy: { type: Number, required: true },
  screenTime: { type: Number, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);
