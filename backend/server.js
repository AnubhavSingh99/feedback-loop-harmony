
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedback');

const app = express();

// ENV VARS (You should set MONGODB_URI in a real app)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback-db';

app.use(cors());
app.use(express.json());

// Feedback API routes
app.use('/api/feedback', feedbackRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
