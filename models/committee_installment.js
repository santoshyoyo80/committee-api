const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CommitteeInstallment = sequelize.define("CommitteeInstallment", {
  installment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  committee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  installment_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  paid_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  penalty_amount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
    validate: { min: 0 },
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: "pending",
    validate: { isIn: [["pending", "paid", "overdue"]] },
  },
}, {
  tableName: "committee_installments",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "modified_at",
  indexes: [
    { fields: ["committee_id"] },
    { fields: ["member_id"] },
    { fields: ["committee_id", "member_id", "installment_no"], unique: true }
  ]
});

module.exports = CommitteeInstallment;
