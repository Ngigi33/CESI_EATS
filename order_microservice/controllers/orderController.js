import orderModel from '../models/orderModel';
import userModel from '../models/userModel';
import axios from 'axios';


export const createOrder = async (req, res) => {


  try {
    // 1. Create order in MongoDB
    const new_order = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })

    await new_order.save();

    // 2. Clear the user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 3. Call the payment microservice to create a payment intent
    const paymentResponse = await axios.post('http://localhost:5002/api/payments/create-payment-intent', {
      cartItems: req.body.items,
      customerId: req.body.userId,
      restaurantId: req.body.restaurantId || 'default_restaurant_id',
    });
    const clientSecret = paymentResponse.data.clientSecret;

    // 4. Return the order and clientSecret
    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
      clientSecret,
    });
  }
  catch (error) {
    console.error('❌ Error creating order:', error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }

};

export const getOrderById = async (req, res) => {

};

export const updateOrderStatus = async (req, res) => {

};

export const getOrdersByUser = async (req, res) => {

};






































































// // order-service/controllers/orderController.js
// const db = require('../db');
// const { v4: uuidv4 } = require('uuid');

// exports.createOrder = async (req, res) => {
//   const { user_id, restaurant_id, items } = req.body;
//   const orderId = uuidv4();

//   const conn = await db.getConnection();
//   try {
//     await conn.beginTransaction();
//     await conn.query(
//       'INSERT INTO orders (id, user_id, restaurant_id, status) VALUES (?, ?, ?, ?)',
//       [orderId, user_id, restaurant_id, 'pending']
//     );

//     for (const item of items) {
//       await conn.query(
//         'INSERT INTO order_items (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
//         [orderId, item.item_id, item.quantity, item.price]
//       );
//     }

//     await conn.commit();
//     res.status(201).json({ order_id: orderId, status: 'pending' });
//     console.log(`✅ New order received: ID=${orderId}, User=${user_id}, Restaurant=${restaurant_id}`);
//   } catch (err) {
//     await conn.rollback();
//     res.status(500).json({ error: err.message });
//   } finally {
//     conn.release();
//   }
// };

// exports.getOrderById = async (req, res) => {
//   const orderId = req.params.id;

//   try {
//     // Get order info
//     const [orderRows] = await db.query(
//       'SELECT * FROM orders WHERE id = ?',
//       [orderId]
//     );

//     if (orderRows.length === 0) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     const order = orderRows[0];

//     // Get related items
//     const [items] = await db.query(
//       'SELECT item_id, quantity, price FROM order_items WHERE order_id = ?',
//       [orderId]
//     );

//     res.json({
//       id: order.id,
//       user_id: order.user_id,
//       restaurant_id: order.restaurant_id,
//       status: order.status,
//       created_at: order.created_at,
//       updated_at: order.updated_at,
//       items: items,
//     });
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// exports.updateOrderStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!status) {
//     return res.status(400).json({ error: 'Missing status in request' });
//   }

//   try {
//     const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
//     // console.log('Received PATCH for orderId:', id);
//     // console.log('DB result:', result);
//     // const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
//     // console.log('Matching orders:', rows);


//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.json({ message: 'Order status updated', order_id: id, status });
//   } catch (err) {
//     console.error('Error updating order status:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };




// exports.getOrdersByUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
//     if (orders.length === 0) {
//       return res.status(404).json({ error: 'No orders found for this user' });
//     }
//     res.json(orders);
//   } catch (err) {
//      console.error('Error fetching user orders:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
