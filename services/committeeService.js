const Committee = require("../models/committee");

async function createCommittee(data) {
  const {
    committee_name,
    cycle_frequency,
    installment_amount,
    start_date,
    end_date,
    created_by,
  } = data;

  // Required fields validation
  const requiredFields = {
    committee_name,
    cycle_frequency,
    installment_amount,
    start_date,
    end_date,
    created_by,
  };

  const missing = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => `${key} is required`);

  if (missing.length > 0) {
    throw { type: "validation", errors: missing };
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
    throw { type: "validation", errors };
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

  try {
    const committee = await Committee.create(committeePayload);
    return committee;
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      const field = err.errors[0]?.path || "field";
      throw { type: "unique", errors: [`A committee with this ${field} already exists.`] };
    }

    if (err.name === "SequelizeValidationError") {
      const validationMessages = err.errors.map((e) => e.message);
      throw { type: "validation", errors: validationMessages };
    }

    throw { type: "server", errors: ["Internal server error"], original: err };
  }
}

module.exports = { createCommittee };
