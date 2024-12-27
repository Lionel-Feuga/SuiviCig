const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DailyRecord = sequelize.define('DailyRecord', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  cigarettesSmoked: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'cigarettes_smoked'
  },
  comment: {
    type: DataTypes.TEXT, 
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
  tableName: 'daily_records',
  timestamps: true,
});


module.exports = DailyRecord;