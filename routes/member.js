const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Routes stay minimal
router.post('/', memberController.createMember);
router.get('/', memberController.getMembers);
router.post('/login', memberController.login);

module.exports = router;
