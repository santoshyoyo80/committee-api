const { Member, Committee, CommitteeMember } = require('../models');

// Search member by committee_id and member_id
exports.searchMember = async (req, res) => {
  try {
    const { committee_id, member_id } = req.params;

    // Find committee with specific member
    const committee = await Committee.findByPk(committee_id, {
      include: [{
        model: Member,
        where: { member_id }, // filter by member_id
        attributes: ['member_id', 'name', 'email', 'mobile', 'aadhaar', 'pan', 'address'],
        through: { attributes: ['heads_count', 'joining_date', 'is_manager'] }
      }]
    });

    if (!committee) {
      return res.status(404).json({ error: `Committee ${committee_id} or Member ${member_id} not found` });
    }

    // Flatten member details
    const member = committee.Members[0]; // only one because of where clause
    const result = {
      committee_id: committee.committee_id,
      committee_name: committee.committee_name,
      cycle_frequency: committee.cycle_frequency,
      installment_amount: committee.installment_amount,
      total_installments: committee.total_installments,
      start_date: committee.start_date,
      end_date: committee.end_date,
      is_active: committee.is_active,
      created_by: committee.created_by,
      member: {
        member_id: member.member_id,
        name: member.name,
        email: member.email,
        mobile: member.mobile,
        aadhaar: member.aadhaar,
        pan: member.pan,
        address: member.address,
        heads_count: member.CommitteeMember.heads_count,
        joining_date: member.CommitteeMember.joining_date,
        is_manager: member.CommitteeMember.is_manager
      }
    };

    res.json(result);
  } catch (err) {
    console.error('Error searching member:', err);
    res.status(500).json({ error: err.message });
  }
};
