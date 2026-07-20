const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMemberController');

// Bulk create members for a committee
router.post('/bulk-create', committeeMemberController.createMembersForCommittee);

// // (Optional) Get all committee members with pagination
// router.get('/', committeeMemberController.getCommitteeMembers);

// // (Optional) Login route if you want to authenticate committee members
// router.post('/login', committeeMemberController.login);

module.exports = router;
