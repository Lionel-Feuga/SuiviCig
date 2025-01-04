const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at', 
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at', 
  },
}, {
  tableName:'users',
  timestamps: true,
});

module.exports = User;
