const sequelize = require("../db");

// Controller to call the Postgres function
exports.generateInstallments = async (req, res) => {
  try {
    const { committee_id } = req.body;

    if (!committee_id) {
      return res.status(400).json({ error: "committee_id is required" });
    }

    // Call the Postgres function
    await sequelize.query("SELECT generate_committee_installments(:committee_id)", {
      replacements: { committee_id },
    });

    res.json({ message: "Installments generated successfully" });
  } catch (err) {
    console.error("Error generating installments:", err);
    res.status(500).json({ error: err.message });
  }
};
