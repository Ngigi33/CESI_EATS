const RestaurantMenu = require('../models/RestaurantMenu'); // Ajustez le chemin selon votre structure

// CREATE - Créer un nouveau menu
const createRestaurantMenu = async (req, res) => {
    try {
        const { restaurantId, name, imageUrl } = req.body;

        // Validation des champs requis
        if (!restaurantId || !name) {
            return res.status(400).json({
                success: false,
                message: 'restaurantId et name sont requis'
            });
        }

        const newMenu = new RestaurantMenu({
            restaurantId,
            name,
            imageUrl
        });

        const savedMenu = await newMenu.save();

        res.status(201).json({
            success: true,
            message: 'Menu créé avec succès',
            data: savedMenu
        });

    } catch (error) {
        console.error('Erreur lors de la création du menu:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la création du menu',
            error: error.message
        });
    }
};

// READ - Récupérer tous les menus
const getAllRestaurantMenus = async (req, res) => {
    try {
        const { page = 1, limit = 10, restaurantId } = req.query;
        
        // Construire le filtre
        const filter = {};
        if (restaurantId) {
            filter.restaurantId = restaurantId;
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const menus = await RestaurantMenu.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await RestaurantMenu.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: menus,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des menus:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération des menus',
            error: error.message
        });
    }
};

// READ - Récupérer un menu par UUID
const getRestaurantMenuById = async (req, res) => {
    try {
        const { uuid } = req.params;

        const menu = await RestaurantMenu.findOne({ uuid });

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Menu non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: menu
        });

    } catch (error) {
        console.error('Erreur lors de la récupération du menu:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération du menu',
            error: error.message
        });
    }
};

// READ - Récupérer tous les menus d'un restaurant
const getMenusByRestaurantId = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const menus = await RestaurantMenu.find({ restaurantId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: menus.length,
            data: menus
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des menus du restaurant:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la récupération des menus du restaurant',
            error: error.message
        });
    }
};

// UPDATE - Mettre à jour un menu
const updateRestaurantMenu = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { name, imageUrl } = req.body;

        // Construire l'objet de mise à jour
        const updateData = {};
        if (name) updateData.name = name;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

        const updatedMenu = await RestaurantMenu.findOneAndUpdate(
            { uuid },
            updateData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedMenu) {
            return res.status(404).json({
                success: false,
                message: 'Menu non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu mis à jour avec succès',
            data: updatedMenu
        });

    } catch (error) {
        console.error('Erreur lors de la mise à jour du menu:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la mise à jour du menu',
            error: error.message
        });
    }
};

// DELETE - Supprimer un menu
const deleteRestaurantMenu = async (req, res) => {
    try {
        const { uuid } = req.params;

        const deletedMenu = await RestaurantMenu.findOneAndDelete({ uuid });

        if (!deletedMenu) {
            return res.status(404).json({
                success: false,
                message: 'Menu non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Menu supprimé avec succès',
            data: deletedMenu
        });

    } catch (error) {
        console.error('Erreur lors de la suppression du menu:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la suppression du menu',
            error: error.message
        });
    }
};

// DELETE - Supprimer tous les menus d'un restaurant
const deleteMenusByRestaurantId = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const result = await RestaurantMenu.deleteMany({ restaurantId });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} menu(s) supprimé(s) avec succès`,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error('Erreur lors de la suppression des menus:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la suppression des menus',
            error: error.message
        });
    }
};

module.exports = {
    createRestaurantMenu,
    getAllRestaurantMenus,
    getRestaurantMenuById,
    getMenusByRestaurantId,
    updateRestaurantMenu,
    deleteRestaurantMenu,
    deleteMenusByRestaurantId
};