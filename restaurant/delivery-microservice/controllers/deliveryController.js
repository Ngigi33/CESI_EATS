const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Create a new delivery
exports.createDelivery = async (req, res) => {
  const { order_id, driver_id } = req.body;
  const deliveryId = uuidv4();

  try {
    await db.query(
      'INSERT INTO deliveries (id, order_id, driver_id, status) VALUES (?, ?, ?, ?)',
      [deliveryId, order_id, driver_id, 'assigned']
    );
    res.status(201).json({ delivery_id: deliveryId, status: 'assigned' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update delivery status (e.g., picked up, on the way, delivered)
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { new_status } = req.body;

  try {
    await db.query(
      'UPDATE deliveries SET status = ? WHERE id = ?',
      [new_status, id]
    );
    res.json({ message: `Delivery status updated to ${new_status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Confirm delivery (driver or user)
exports.confirmDelivery = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const column = role === 'driver' ? 'confirmed_by_driver' : 'confirmed_by_user';

  try {
    await db.query(`UPDATE deliveries SET ${column} = true WHERE id = ?`, [id]);
    res.json({ message: `${role} confirmed delivery` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get delivery by order ID
exports.getByOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM deliveries WHERE order_id = ?', [orderId]);
    if (rows.length === 0) return res.status(404).json({ message: 'Delivery not found' });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
