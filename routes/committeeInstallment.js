const express = require("express");
const router = express.Router();

const committeeInstallmentController = require('../controllers/committeeInstallmentController');

// POST /api/committee-installments
router.post("/", committeeInstallmentController.generateInstallments);

module.exports = router;
