const Goal = require('../models/Goal');
const { Op } = require('sequelize');

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({ where: { userId: req.user.id } });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des objectifs' });
  }
};

exports.addOrUpdateGoal = async (req, res) => {
  const { startDate, endDate, maxCigarettesPerDay } = req.body;
  const userId = req.user.id;

  try {
    const adjustedEndDate = new Date(endDate);

    const existingGoal = await Goal.findOne({
      where: {
        userId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, adjustedEndDate] },
          },
          {
            endDate: { [Op.between]: [startDate, adjustedEndDate] },
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: adjustedEndDate } },
            ],
          },
        ],
      },
    });

    if (existingGoal) {
      existingGoal.startDate = startDate;
      existingGoal.endDate = adjustedEndDate;
      existingGoal.maxCigarettesPerDay = maxCigarettesPerDay;
      await existingGoal.save();

      return res.status(200).json({
        message: 'Objectif mis à jour avec succès',
        goal: existingGoal,
      });
    } else {
      const newGoal = await Goal.create({
        userId,
        startDate,
        endDate: adjustedEndDate,
        maxCigarettesPerDay,
      });

      return res.status(201).json({
        message: 'Nouvel objectif créé avec succès',
        goal: newGoal,
      });
    }
  } catch (error) {
    console.error('Erreur lors de l’ajout ou de la mise à jour de l’objectif:', error);
    res.status(500).json({ error: "Erreur lors de l'ajout ou de la mise à jour de l'objectif" });
  }
};


exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const goal = await Goal.findOne({ where: { id, userId } });

    if (!goal) {
      return res.status(404).json({ error: "Objectif non trouvé" });
    }

    await goal.destroy();
    res.status(200).json({ message: "Objectif supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l’objectif:", error);
    res.status(500).json({ error: "Erreur lors de la suppression de l’objectif" });
  }
};

exports.deleteAllGoals = async (req, res) => {
  const userId = req.user.id;

  try {
    const deletedCount = await Goal.destroy({ where: { userId } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Aucun objectif trouvé pour cet utilisateur" });
    }

    res.status(200).json({ message: "Tous les objectifs ont été supprimés avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression des objectifs:", error);
    res.status(500).json({ error: "Erreur lors de la suppression des objectifs" });
  }
};

