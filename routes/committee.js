const express = require('express');
const router = express.Router();
const committeeController = require('./../controllers/committeeController');

// Routes stay lean
router.post('/', committeeController.createCommittee);

module.exports = router;
