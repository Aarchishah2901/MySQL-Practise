const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const JobApplication = sequelize.define('JobApplication', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_requirement_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  applicant_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'job_applications',
  timestamps: false
});

module.exports = JobApplication;