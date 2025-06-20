const restaurantModel = require('../models/restaurantModel');


exports.addRestaurant = async (req, res) => {
    try {
        const { name, address, phoneNumber, email } = req.body;
        const image = `${req.file.filename}`;
        if (!name || !address || !phoneNumber || !email || !image) {
            return res.status(400).json({ message: 'Tous les champs sont requis', name      , address, phoneNumber, email, image });
        }
        const newRestaurant = new restaurantModel({
            name,
            address,
            phoneNumber,
            email,
            imageUrl: image
        });
        await newRestaurant.save();
        res.status(201).json({ message: 'Restaurant créé avec succès', restaurant: newRestaurant });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du restaurant', error: error.message });
    }
};
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des restaurants', error: error.message });
    }
};
exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findOne({ IdRestaurant: req.params.id }); // Utiliser restaurantId pour la recherche
        if (!restaurant) {                          
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du restaurant', error: error.message });
    }
};  

exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const restaurant = await restaurantModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }
        res.status(200).json({ message: 'Restaurant mis à jour avec succès', restaurant });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant', error: error.message });
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurantModel.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }
        res.status(200).json({ message: 'Restaurant supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du restaurant', error: error.message });
    }
};

exports.getRestaurantByName = async (req, res) => {
    try {
        const { name } = req.params;
        const restaurant = await restaurantModel.findOne({ name: new RegExp(name, 'i') }); // Recherche insensible à la casse
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du restaurant', error: error.message });
    }
};

