const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const JobRequests = sequelize.define("JobRequest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  application_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  coverLetter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM("Pending", "Selected", "Rejected"),
    allowNull: true,
  },

  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

module.exports = JobRequests;