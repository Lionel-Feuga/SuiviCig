const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const userController = require("../controllers/UserController");
const dailyRecordController = require("../controllers/DailyRecordController");
const goalController = require("../controllers/GoalController");
const statisticController = require("../controllers/StatisticController");

// Routes d'authentification
router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
router.post("/auth/logout", authenticate, userController.logout);
  
router.use(authenticate, userController.isTokenValid);

// Routes des enregistrements journaliers
router.get("/daily-records", dailyRecordController.getDailyRecords);
router.post("/daily-records", dailyRecordController.addOrUpdateDailyRecord);

// Routes des objectifs
router.get("/goals", goalController.getGoals);
router.post("/goals", goalController.addOrUpdateGoal);
router.delete('/goals/:id', goalController.deleteGoal);
router.delete('/goals', goalController.deleteAllGoals);

// Routes des statistiques
router.get("/statistics", statisticController.getStatistics);
router.put("/statistics", statisticController.updateStatistics);

module.exports = router;
