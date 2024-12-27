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
    res.status(401).json({ error: 'Token invalide.' });
  }
};

module.exports = authenticate;
