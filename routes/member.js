const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Committee = require('../models/committee');

// CREATE member
router.post('/', async (req, res) => {
  try {
    const { committee_id } = req.body;

    // Check committee exists
    const committee = await Committee.findByPk(committee_id);
    if (!committee) {
      return res.status(400).json({ error: 'Committee not found' });
    }


    if (!req.body.aadhaar) {
      return res.status(400).json({ error: 'Aadhaar is required' });
    }
    
    // Step 1: Check if committee already exists
    const existing = await Member.findOne({ where: { aadhaar: req.body.aadhaar } });

    if (existing) {
      // Member already exists
      return res.status(400).json({
        error: `Member with aadhaar '${req.body.aadhaar}' already exists`
      });
    }

    // Step 2: Create member
    const member = await Member.create({
      ...req.body,
      created_date: new Date(),
      modified_date: new Date(),
    });
    res.status(201).json(member);
  } catch (err) {
    console.error("Error while creating member:", err);
    res.status(500).json({ error: ' ' + err.message });
  }
});

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.findAll({ include: Committee });
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

module.exports = router;
