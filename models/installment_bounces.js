const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const InstallmentBounces = sequelize.define("InstallmentBounces", {
  bounce_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  installment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  penalty_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
  },
  decided_by: {
    type: DataTypes.INTEGER,
  },
  decidedby_name: {
    type: DataTypes.STRING,
  },
  is_paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "installment_bounces",
  timestamps: false
});

module.exports = InstallmentBounces;
