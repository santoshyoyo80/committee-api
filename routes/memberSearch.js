const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Search by ID
router.get('/members/id/:id', async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error searching member by ID:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search by Aadhaar
router.get('/members/aadhaar/:aadhaar', async (req, res) => {
  try {
    const member = await Member.findOne({ where: { aadhaar: req.params.aadhaar } });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error searching member by Aadhaar:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search by PAN
router.get('/members/pan/:pan', async (req, res) => {
  try {
    const member = await Member.findOne({ where: { pan: req.params.pan } });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error searching member by PAN:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search by Email
router.get('/members/email/:email', async (req, res) => {
  try {
    const member = await Member.findOne({ where: { email: req.params.email } });
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    console.error('Error searching member by Email:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search by Name (return multiple if found)
router.get('/members/name/:name', async (req, res) => {
  try {
    const members = await Member.findAll({ where: { member_name: req.params.name } });
    if (!members || members.length === 0) {
      return res.status(404).json({ error: 'No members found with that name' });
    }
    res.json(members); // returns array of records
  } catch (err) {
    console.error('Error searching member by Name:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
