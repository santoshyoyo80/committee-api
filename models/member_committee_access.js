const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MemberCommitteeAccess = sequelize.define(
  'MemberCommitteeAccess',
  {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    committee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    permission_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    }
  },
  {
    tableName: 'member_committee_access',
    timestamps: false
  }
);

module.exports = MemberCommitteeAccess;
