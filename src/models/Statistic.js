const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Statistic = sequelize.define('Statistic', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    field:'user_id',
    },
    totalCigarettesSaved: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field:'total_cigarettes_saved',
    },
    totalCo2Saved: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      field:'total_co2_saved',
    },
    totalEurosSaved: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      field:'total_euros_saved',
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
    tableName: 'statistics',
    timestamps: true,
  });
  
  module.exports = Statistic;