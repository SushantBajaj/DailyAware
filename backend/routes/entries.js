const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');
const auth = require('../middleware/authMiddleware');

// create entry
router.post('/', auth, async (req, res, next) => {
  try {
    const data = { ...req.body, user: req.user._id };
    const entry = new Entry(data);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) { next(err); }
});

// get all entries for user (latest first)
router.get('/', auth, async (req, res, next) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).sort({ date: -1, createdAt: -1 });
    res.json(entries);
  } catch (err) { next(err); }
});

// delete entry
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

module.exports = router;
