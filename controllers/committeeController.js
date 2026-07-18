const Committee = require('../models/committee');

// Controller function
exports.createCommittee = async (req, res) => {
  try {
    const { committee_name, commit_tenure, created_by } = req.body;

    const errors = await validateCommitteeInput({ committee_name });
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const committee = await Committee.create({
      committee_name,
      commit_tenure,
      created_by,
      created_date: new Date(),
      modified_date: new Date(),
    });

    res.status(201).json(committee);
  } catch (err) {
    console.error('Error creating committee:', err);
    res.status(500).json({ errors: [err.message] });
  }
};

// Validation helper
async function validateCommitteeInput({ committee_name }) {
  const errors = [];

  if (!committee_name) {
    errors.push('Committee name is required');
  } else {
    const existing = await Committee.findOne({ where: { committee_name } });
    if (existing) {
      errors.push(`Committee with name '${committee_name}' already exists`);
    }
  }

  return errors;
}
