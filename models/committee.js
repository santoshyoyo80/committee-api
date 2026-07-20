const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Committee = sequelize.define('Committee', {
  committee_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  committee_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, // enforce uniqueness at ORM level
    validate: {
      len: [3, 100] // optional: enforce length
    }
  },
  cycle_frequency: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['monthly', 'weekly', 'quarterly', 'yearly']] // matches your DDL intent
    }
  },
  installment_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isAfterStart(value) {
        if (value && this.start_date && new Date(value) <= new Date(this.start_date)) {
          throw new Error('End date must be after start date');
        }
      }
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_by: {
    type: DataTypes.STRING(50),
    allowNull: true,
  }
}, {
  tableName: 'committees',
  timestamps: false // we’re not using Sequelize’s auto timestamps
});

module.exports = Committee;
