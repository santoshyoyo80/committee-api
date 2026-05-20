const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Committee = require('./committee');

const Member = sequelize.define('Member', {
  member_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  member_name: { type: DataTypes.STRING, allowNull: false },
  mobile: { type: DataTypes.STRING },
  aadhaar: { type: DataTypes.STRING, unique: true },
  pan: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING },
  relative_name: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT },
  opening_date: { type: DataTypes.DATE },
  opening_charge: { type: DataTypes.INTEGER },
  total_installments: { type: DataTypes.INTEGER },
  due_date: { type: DataTypes.DATE },
  maturity_date: { type: DataTypes.DATE },
  mediator_name: { type: DataTypes.STRING },
  created_by: { type: DataTypes.STRING, allowNull: false },
  created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  modified_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'members',
  schema: 'public',
  timestamps: false,
});

module.exports = Member;
