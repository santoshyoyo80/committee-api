const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Committee = sequelize.define('Committee', {
  committee_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  committee_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,// enforce uniqueness at ORM level
  },
  commit_tenure: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  modified_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'committees',
  timestamps: false, // we’re handling created_date/modified_date manually
});

module.exports = Committee;
