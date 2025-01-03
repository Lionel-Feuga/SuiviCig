const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la création de l’utilisateur:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l’utilisateur" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

const blacklist = new Set();

exports.logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (token) {
    blacklist.add(token); 
    return res.status(200).json({ message: "Déconnexion réussie." });
  }
  return res.status(400).json({ message: "Token introuvable." });
};

exports.isTokenValid = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (blacklist.has(token)) {
    return res.status(401).json({ message: "Token révoqué." });
  }
  next();
};

