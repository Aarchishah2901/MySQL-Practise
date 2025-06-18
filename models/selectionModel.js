const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');

const Selection = sequelize.define('Selection', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applicant_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    },
  },
  job_applicant_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selection_status: {
    type: DataTypes.ENUM('Select', 'Reject', 'Pending'),
    allowNull: false
  },
  message_to_user: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Selection.belongsTo(User, {foreignKey: 'userId' });

module.exports = Selection;