const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization'); 
  if (!authHeader) {
    return res.status(401).json({ error: 'Accès refusé. Aucun token fourni.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token manquant ou invalide.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Payload JWT décodé :', decoded); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré. Veuillez vous reconnecter.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token invalide.' });
    } else {
      return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
  }
};

module.exports = authenticate;
