const sequelize = require('../config/db');
const User = require('./User');
const DailyRecord = require('./DailyRecord');
const Goal = require('./Goal');
const Statistic = require('./Statistic');

User.hasMany(DailyRecord, { foreignKey: 'user_id', onDelete: 'CASCADE' });
DailyRecord.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Goal, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Goal.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Statistic, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Statistic.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  DailyRecord,
  Goal,
  Statistic,
};
