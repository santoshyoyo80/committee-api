// routes/member_committees.js
const express = require('express');
const router = express.Router();

// Import models (CommonJS style, same as member.js)
const Member = require('../models/Member');
const Committee = require('../models/committee');
const MemberCommittee = require('../models/MemberCommittee'); // join table

// POST: assign committees to a member
router.post('/member_committees', async (req, res) => {
  try {
    const { member_id, committee_ids } = req.body;

    // Find the member
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Assign multiple committees in one go
    await member.addCommittees(committee_ids);

    res.status(200).json({ message: 'Committees assigned successfully' });
  } catch (err) {
    console.error('Error assigning committees:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
