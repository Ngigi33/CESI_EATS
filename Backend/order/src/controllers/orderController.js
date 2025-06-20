const orderModel = require('../models/orderModel');

exports.addOrder = async (req, res) => {
    try {
        const { userId, restaurantId, items, totalAmount } = req.body;
        const newOrder = new orderModel({
            userId,
            restaurantId,
            items,
            totalAmount
        });
        await newOrder.save();
        res.status(201).json({ message: 'Commande créée avec succès', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
};
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId restaurantId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id).populate('userId restaurantId');
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande', error: error.message });
    }
};
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const order = await orderModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!order) {                       
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande mise à jour avec succès', order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error: error.message });
    }
};
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }
        res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error: error.message });
    }
};
exports.getOrdersByUserId = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.params.userId }).populate('restaurantId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes de l\'utilisateur', error: error.message });
    }
};
exports.getOrdersByRestaurantId = async (req, res) => {
    try {
        const orders = await orderModel.find({ restaurantId: req.params.restaurantId }).populate('userId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Aucune commande trouvée pour ce restaurant' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes du restaurant', error: error.message });
    }
};
exports.getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await orderModel.find({ userId }).populate('userId restaurantId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'Aucune commande trouvée avec userId' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes par userId', error: error.message });
    }
};

