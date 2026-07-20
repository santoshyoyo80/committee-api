const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CommitteeMember = sequelize.define(
  "CommitteeMember",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // PK

    folioNo: { type: DataTypes.STRING, unique: true }, // F-000 style
    member_id: { type: DataTypes.INTEGER, allowNull: false },
    committee_id: { type: DataTypes.INTEGER, allowNull: false },

    heads_count: { type: DataTypes.INTEGER, defaultValue: 1 }, // number of heads

    joining_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    is_manager: { type: DataTypes.BOOLEAN, defaultValue: false },
    joined_by: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "committee_members",
    timestamps: false,
  }
);

// Hook to auto-generate folioNo like F-000, F-001
CommitteeMember.beforeCreate(async (record) => {
  const lastRecord = await CommitteeMember.findOne({
    order: [["id", "DESC"]],
  });
  const nextId = lastRecord ? lastRecord.id + 1 : 1;
  record.folioNo = `F-${String(nextId).padStart(3, "0")}`;
});

module.exports = CommitteeMember;
