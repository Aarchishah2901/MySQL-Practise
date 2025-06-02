const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const JobRequest = sequelize.define("JobRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Selected", "Rejected"),
    defaultValue: "Pending",
  },
  message: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
});

module.exports = JobRequest;