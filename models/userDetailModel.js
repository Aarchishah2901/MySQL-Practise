const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // adjust path if needed

const UserDetails = sequelize.define("UserDetails", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  joindate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "user_detail",
  timestamps: false
});

module.exports = UserDetails;