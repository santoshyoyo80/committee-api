const committeeService = require("../services/committeeService");

exports.createCommittee = async (req, res) => {
  try {
    const committee = await committeeService.createCommittee(req.body);
    return res.status(201).json(committee);
  } catch (err) {
    if (err.type === "validation") {
      return res.status(400).json({ errors: err.errors });
    }
    if (err.type === "unique") {
      return res.status(400).json({ errors: err.errors });
    }
    console.error("Error creating committee:", err.original || err);
    return res.status(500).json({ errors: err.errors || ["Internal server error"] });
  }
};
