const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Goal = sequelize.define('Goal', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field:'user_id',
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field:'start_date',
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field:'end_date',
  },
  maxCigarettesPerDay: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field:'max_cigarettes_per_day',
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
  tableName:'goals',
  timestamps: true,
});

module.exports = Goal;