const DailyRecord = require('../models/DailyRecord');

exports.getDailyRecords = async (req, res) => {
  try {
    const records = await DailyRecord.findAll({ where: { userId: req.user.id } });
    res.json(records);
  } catch (error) {
    console.error("Erreur lors de l’ajout de l’enregistrement", error);
    res.status(500).json({ error: 'Erreur lors de la récupération des enregistrements' });
  }
};

exports.addOrUpdateDailyRecord = async (req, res) => {
  const { date, cigarettesSmoked } = req.body;

  try {
    let record = await DailyRecord.findOne({
      where: {
        userId: req.user.id,
        date,
      },
    });

    if (record) {
      record.cigarettesSmoked = cigarettesSmoked;
      await record.save();
      return res.json({ message: "Enregistrement mis à jour", record });
    } else {
      record = await DailyRecord.create({
        userId: req.user.id,
        date,
        cigarettesSmoked,
      });
      return res.status(201).json({ message: "Enregistrement créé", record });
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout ou de la mise à jour de l'enregistrement :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout ou de la mise à jour de l'enregistrement" });
  }
};
