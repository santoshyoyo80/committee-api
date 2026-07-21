const express = require('express');
const router = express.Router();
const committeeMemberController = require('../controllers/committeeMemberController');

// To create multiple members for a specific committee
router.post('/bulk-create', committeeMemberController.createMembersForCommittee);

// To get all members of a specific committee by committee_id
router.get('/:committee_id/members', committeeMemberController.getMembersByCommittee);

// // (Optional) Get all committee members with pagination
// router.get('/', committeeMemberController.getCommitteeMembers);

// // (Optional) Login route if you want to authenticate committee members
// router.post('/login', committeeMemberController.login);

module.exports = router;
