const sequelize = require('../config/db');
const User = require('./User');
const DailyRecord = require('./DailyRecord');
const Goal = require('./Goal');
const Statistic = require('./Statistic');

module.exports = {
  sequelize,
  User,
  DailyRecord,
  Goal,
  Statistic,
};
