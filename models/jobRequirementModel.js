const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const JobRequirement = sequelize.define('JobRequirement', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  required_experience: {
    type: DataTypes.STRING,
    allowNull: true
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: true
  },
  posted_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open'
  },
  work_type: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'job_requirements',
  timestamps: false
});

module.exports = JobRequirement;