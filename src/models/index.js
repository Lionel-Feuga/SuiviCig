const sequelize = require('../config/db');
const User = require('./User');
const DailyRecord = require('./DailyRecord');
const Goal = require('./Goal');
const Statistic = require('./Statistic');

User.hasMany(DailyRecord, { foreignKey: 'userId' });
DailyRecord.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Goal, { foreignKey: 'userId' });
Goal.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Statistic, { foreignKey: 'userId' });
Statistic.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  DailyRecord,
  Goal,
  Statistic,
};
