const memberService = require('../services/memberService');

exports.searchMember = async (req, res) => {
  try {
    const { committee_id, member_id } = req.params;
    const result = await memberService.searchMember(committee_id, member_id);

    if (!result) {
      return res.status(404).json({ error: `Member ${member_id} not found in Committee ${committee_id}` });
    }

    res.json(result);
  } catch (err) {
    console.error('Error searching member:', err);
    res.status(500).json({ error: err.message });
  }
};
