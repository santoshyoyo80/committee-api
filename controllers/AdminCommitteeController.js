const adminCommitteeService = require('../services/adminCommitteeService');

// Get all committees a member has access to
exports.getCommittees = async (req, res) => {
    const { member_id } = req.params;
    try {
        const committees = await adminCommitteeService.getCommitteesByMember(member_id);
        res.json(committees);
    } catch (err) {
        console.error('Error during getCommittees:', err);
        res.status(404).json({ error: err.message });
    }
};
