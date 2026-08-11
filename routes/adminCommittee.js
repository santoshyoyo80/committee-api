const express = require('express');
const router = express.Router();
const AdminCommitteeController = require('../controllers/AdminCommitteeController');

// Get all committees a member has access to with permission levels
router.get('/member/:member_id/committees', AdminCommitteeController.getCommittees);

module.exports = router;
