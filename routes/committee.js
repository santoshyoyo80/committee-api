const express = require('express');
const router = express.Router();
const Committee = require('../models/committee');

// CREATE committee with uniqueness check
router.post('/', async (req, res) => {
  try {
    const { committee_name, commit_tenure, created_by } = req.body;

    // Step 1: Check if committee already exists
    const existing = await Committee.findOne({ where: { committee_name } });
    if (existing) {
      return res.status(400).json({
        error: `Committee with name '${committee_name}' already exists`
      });
    }

    // Step 2: Insert new committee
    const committee = await Committee.create({
      committee_name,
      commit_tenure,
      created_by,
      created_date: new Date(),
      modified_date: new Date(),
    });

    res.status(201).json(committee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create committee' });
  }
});

module.exports = router;


