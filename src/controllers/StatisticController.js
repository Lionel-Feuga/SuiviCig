const Statistic = require('../models/Statistic');

exports.getStatistics = async (req, res) => {
  try {
    const stats = await Statistic.findOne({ where: { userId: req.user.id } });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};

exports.updateStatistics = async (req, res) => {
  const { totalCigarettesSaved, totalCo2Saved, totalEurosSaved } = req.body;
  try {
    const stats = await Statistic.findOne({ where: { userId: req.user.id } });
    if (!stats) {
      const newStats = await Statistic.create({
        userId: req.user.id,
        totalCigarettesSaved,
        totalCo2Saved,
        totalEurosSaved,
      });
      return res.status(201).json(newStats);
    }

    stats.totalCigarettesSaved += totalCigarettesSaved;
    stats.totalCo2Saved += totalCo2Saved;
    stats.totalEurosSaved += totalEurosSaved;
    await stats.save();

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour des statistiques' });
  }
};

