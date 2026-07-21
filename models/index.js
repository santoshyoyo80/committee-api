const Member = require('./member');
const Committee = require('./committee');
const CommitteeMember = require('./committee_member');

// Many-to-Many between Member and Committee
Member.belongsToMany(Committee, {
  through: CommitteeMember,
  foreignKey: 'member_id',
  otherKey: 'committee_id'
});

Committee.belongsToMany(Member, {
  through: CommitteeMember,
  foreignKey: 'committee_id',
  otherKey: 'member_id'
});

// Direct associations for eager loading
Member.hasMany(CommitteeMember, { foreignKey: 'member_id' });
CommitteeMember.belongsTo(Member, { foreignKey: 'member_id' });

Committee.hasMany(CommitteeMember, { foreignKey: 'committee_id' });
CommitteeMember.belongsTo(Committee, { foreignKey: 'committee_id' });

// Extra association: joined_by references another Member
CommitteeMember.belongsTo(Member, { as: 'joinedBy', foreignKey: 'joined_by' });

module.exports = { Member, Committee, CommitteeMember };
