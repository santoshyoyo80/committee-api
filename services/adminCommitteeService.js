const { Member, Committee, MemberCommitteeAccess } = require('../models');
const CommitteeAccessDTO = require('../dtos/CommitteeAccessDTO');

/**
 * Get all committees a member has access to with permission levels
 */
async function getCommitteesByMember(member_id) {
  const member = await Member.findByPk(member_id, {
    include: [{
      model: MemberCommitteeAccess,
      include: [{
        model: Committee
      }]
    }]
  });

  if (!member) {
    throw new Error(`Member with ID ${member_id} not found`);
  }

  return CommitteeAccessDTO.fromAccessArray(member.MemberCommitteeAccesses);
}

module.exports = { getCommitteesByMember };
