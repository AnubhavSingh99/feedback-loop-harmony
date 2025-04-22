
const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Get all feedback
router.get('/', async (req, res) => {
  const items = await Feedback.find();
  res.json(items);
});

// Create new feedback
router.post('/', async (req, res) => {
  const item = new Feedback(req.body);
  await item.save();
  res.json(item);
});

// Update feedback
router.put('/:id', async (req, res) => {
  const item = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// Delete feedback
router.delete('/:id', async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
