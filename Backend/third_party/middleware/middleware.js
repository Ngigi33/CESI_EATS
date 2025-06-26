const Developer = require('../models/Developer');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'API Key manquante' });

  const developer = await Developer.findOne({ apiKey: token });
  if (!developer) return res.status(403).json({ error: 'API Key invalide' });

  req.developer = developer;
  next();
};
