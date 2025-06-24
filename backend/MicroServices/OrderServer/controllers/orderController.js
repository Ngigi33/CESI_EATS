// backend/MicroServices/OrderServer/controllers/orderController.js

import Order from '../models/orderModel.js'; // Corrected: Use import instead of require

// Get all orders
export const getAllOrders = async (req, res) => { // Corrected: Use export const
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific order by id
export const getOrderById = async (req, res) => { // Corrected: Use export const
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Commande non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new order
export const createOrder = async (req, res) => { // Corrected: Use export const
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// edit an order
export const updateOrder = async (req, res) => { // Corrected: Use export const
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Commande non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => { // Corrected: Use export const
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) {
      res.status(204).json({ message: 'Commande supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Commande non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};