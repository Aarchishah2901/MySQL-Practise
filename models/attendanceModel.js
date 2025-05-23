const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Present', 'Absent', 'Leave'),
    allowNull: false
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Attendance;