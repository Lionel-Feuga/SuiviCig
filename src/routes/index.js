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
router.post('/auth/logout', authenticate, (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
  });
  
// Routes des enregistrements journaliers
router.get("/daily-records", authenticate, dailyRecordController.getDailyRecords);
router.post("/daily-records", authenticate, dailyRecordController.addDailyRecord);

// Routes des objectifs
router.get("/goals", authenticate, goalController.getGoals);
router.post("/goals", authenticate, goalController.addOrUpdateGoal);
router.delete('/goals/:id', authenticate, goalController.deleteGoal);
router.delete('/goals', authenticate, goalController.deleteAllGoals);

// Routes des statistiques
router.get("/statistics", authenticate, statisticController.getStatistics);
router.put("/statistics", authenticate, statisticController.updateStatistics);

module.exports = router;
