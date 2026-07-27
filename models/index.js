const Member = require('./member');
const Committee = require('./committee');
const CommitteeMember = require('./committee_member');
const CommitteeInstallments = require('./committee_installments');
const InstallmentBounces = require('./installment_bounces');

// Committee ↔ Member
Member.belongsToMany(Committee, { through: CommitteeMember, foreignKey: 'member_id', otherKey: 'committee_id' });
Committee.belongsToMany(Member, { through: CommitteeMember, foreignKey: 'committee_id', otherKey: 'member_id' });

// Direct associations
Member.hasMany(CommitteeMember, { foreignKey: 'member_id' });
CommitteeMember.belongsTo(Member, { foreignKey: 'member_id' });

Committee.hasMany(CommitteeMember, { foreignKey: 'committee_id' });
CommitteeMember.belongsTo(Committee, { foreignKey: 'committee_id' });

// Extra association
CommitteeMember.belongsTo(Member, { as: 'joinedBy', foreignKey: 'joined_by' });

// CommitteeInstallments ↔ Committee & Member
Committee.hasMany(CommitteeInstallments, { foreignKey: 'committee_id' });
CommitteeInstallments.belongsTo(Committee, { foreignKey: 'committee_id' });

Member.hasMany(CommitteeInstallments, { foreignKey: 'member_id' });
CommitteeInstallments.belongsTo(Member, { foreignKey: 'member_id' });

// CommitteeInstallments ↔ InstallmentBounces
CommitteeInstallments.hasMany(InstallmentBounces, { foreignKey: 'installment_id' });
InstallmentBounces.belongsTo(CommitteeInstallments, { foreignKey: 'installment_id' });

module.exports = { Member, Committee, CommitteeMember, CommitteeInstallments, InstallmentBounces };
