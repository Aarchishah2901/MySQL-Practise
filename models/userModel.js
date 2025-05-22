const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // import the actual Sequelize instance here

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('hr', 'employee', 'user'),
    defaultValue: 'user'
  }
}, {
  tableName: 'users',  // specify the table name explicitly (optional but good practice)
  timestamps: true     // add createdAt and updatedAt automatically
});

module.exports = User;