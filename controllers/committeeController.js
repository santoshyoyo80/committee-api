const Committee = require("../models/committee");

// @desc    Create a new committee
// @route   POST /api/committees
// @access  Private
exports.createCommittee = async (req, res) => {
  try {
    const {
      committee_name,
      cycle_frequency,
      installment_amount,
      start_date,
      end_date,
      created_by,
    } = req.body;

    // Required fields list
    const requiredFields = {
      committee_name,
      cycle_frequency,
      installment_amount,
      start_date,
      end_date,
      created_by,
    };

    // Collect missing fields
    const missing = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => `${key} is required`);

    if (missing.length > 0) {
      return res.status(400).json({ errors: missing });
    }

    // Extra validations
    const errors = [];
    if (!["monthly", "quarterly", "yearly"].includes(cycle_frequency)) {
      errors.push("cycle_frequency must be one of: monthly, quarterly, yearly");
    }
    if (Number(installment_amount) <= 0) {
      errors.push("installment_amount must be greater than 0");
    }
    if (new Date(end_date) <= new Date(start_date)) {
      errors.push("end_date must be after start_date");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Build payload
    const committeePayload = {
      committee_name,
      cycle_frequency,
      installment_amount,
      start_date,
      end_date,
      created_by,
    };

    const committee = await Committee.create(committeePayload);

    return res.status(201).json(committee);
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const field = err.errors[0]?.path || "field";
      return res.status(400).json({
        errors: [`A committee with this ${field} already exists.`],
      });
    }

    if (err.name === "SequelizeValidationError") {
      const validationMessages = err.errors.map((e) => e.message);
      return res.status(400).json({ errors: validationMessages });
    }

    console.error("Error creating committee:", err);
    return res.status(500).json({ errors: ["Internal server error"] });
  }
};
