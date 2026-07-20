const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Member = sequelize.define(
  "Member",
  {
    member_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: { isEmail: true },
    },
    relative_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    aadhaar: {
      type: DataTypes.STRING(12),
      allowNull: true,
      unique: true,
      validate: { is: /^[0-9]{12}$/ },
    },
    pan: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    is_manager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "members",
    schema: "public",
    timestamps: false,
    hooks: {
      beforeUpdate: (member) => {
        member.modified_date = new Date();
      },
    },
  }
);

module.exports = Member;
