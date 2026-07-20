const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Installment = require("./installment");

const Penalty = sequelize.define("Penalty", {
  penalty_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  installment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  penalty_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  added_by: {
    type: DataTypes.INTEGER, // manager_id
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "penalties",
  timestamps: false,
});

// Associations
Penalty.belongsTo(Installment, { foreignKey: "installment_id" });
Installment.hasMany(Penalty, { foreignKey: "installment_id" });

module.exports = Penalty;
