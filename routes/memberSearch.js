const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

const memberController = require('../controllers/memberController');

// GET /api/committees/:committee_id/members/:member_id
router.get('/:committee_id/members/:member_id', memberController.searchMember);

module.exports = router;
