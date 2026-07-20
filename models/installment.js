const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const CommitteeMember = require("./committee_member");

const Installment = sequelize.define("Installment", {
  installment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  committee_member_id: {
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paid_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: "pending", // always pending until manager validates
  }
}, {
  tableName: "installments",
  timestamps: false,
});

// Associations
Installment.belongsTo(CommitteeMember, { foreignKey: "committee_member_id" });
CommitteeMember.hasMany(Installment, { foreignKey: "committee_member_id" });

module.exports = Installment;
