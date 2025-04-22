
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: String,
  votes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  assignedTo: String,
  comments: [{
    content: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
  }]
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
