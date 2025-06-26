import axios from "axios";

// URL of the order microservice
const ORDER_MICROSERVICE_URL = "http://localhost:3001";

export const updateDriverStatus_in_order = async (req, res) => {
  const { orderID } = req.params;
  const { driverstatus } = req.body;

  try {
    const response = await axios.patch(`${ORDER_MICROSERVICE_URL}/api/orders/driver_status`, {
      orderID,
      driverstatus
    })

    res.status(201).json({
      success: true,
      message: 'Driver status updated successfull'
    });
  }
  catch (error) {
    console.error('❌ Error updating driver status :', error.message);
    res.status(500).json({ error: 'Failed to update driver status order' });
  }
}