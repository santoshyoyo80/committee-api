const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CommitteeMember = sequelize.define(
  "CommitteeMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    folio_no: {
      type: DataTypes.STRING(10),
      unique: true,
    },

    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "member_id",
    },

    committee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "committee_id",
    },

    heads_count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      field: "heads_count",
    },

    joining_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "joining_date",
    },

    is_manager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_manager",
    },

    joined_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "joined_by",
    },
  },
  {
    tableName: "committee_members",
    schema: "public",
    timestamps: false,
  }
);

// ✅ Safe folio_no generation using id after insert
CommitteeMember.afterCreate(async (record) => {
  // Generate folio_no based on the auto-incremented id
  const folio = `F-${String(record.id).padStart(3, "0")}`;
  // Update the record with the generated folio_no
  await record.update({ folio_no: folio });
});

module.exports = CommitteeMember;
