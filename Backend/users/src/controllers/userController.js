const userModel = require('../models/usersmodels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = (req, res) => {
    const { name, email, password, role, status, permissions } = req.body;
    const image = `${req.file.filename}`;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis', image, name, email, password });
    }

    var newUser = new userModel({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        imageUrl: image,
        role,
        status,
        permissions
    });
    newUser.save()
        .then(() => {
            res.status(201).json({ message: 'Nouvel utilisateur créé !' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
        });
};

// Login user and generate JWT
exports.login = async (req, res) => {
    // if (!req.body) {
    //   return res.status(400).json({ message: "Name and password are required in req", name: req.body.name, password: req.body.password });
    // }
  const { email, password} = req.body;
    const passwordd = bcrypt.hashSync(password, 10);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required", email, passwordd });
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    if (await bcrypt.compare(passwordd, user.password)) {
      const accessToken = jwt.sign(
        { name: user.name, userId: user.uuid, email: user.email, role: user.role, permissions: user.permissions, exp: Math.floor(Date.now() / 1000) + 120 },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, email, password });
  }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
};
exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.findOne({ IdUser: req.params.id }); // Utiliser userId pour la recherche
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
    }
};  

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await userModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
};

exports.getUserByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await userModel.findOne({ name: new RegExp(name, 'i') }); // Recherche insensible à la casse
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: error.message });
    }
};

