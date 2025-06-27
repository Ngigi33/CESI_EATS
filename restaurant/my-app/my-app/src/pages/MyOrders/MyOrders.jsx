// MyOrders.jsx
import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css'; // Import your CSS file
import FilterSearchSection from './FilterSearchSection'; // Import the filter/search component
import OrderCard from './OrderCard'; // Import the order card component
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const MyOrders = () => {

  const { url_order, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post("/api/orders/userOrders", {}, { headers: { Authorization: `Bearer ${token}` } });
    setData(response.data.data);
    console.log(response.data.data)
  }

  const handleCancelOrder = async (orderID, status) => {
    try {
      const response = await axios.patch("/api/orders/status", {
        orderID: orderID,
        status: status
      }, {headers: {Authorization: `Bearer ${token}`}});

      if (response.data.success) {
        alert("Order cancelled successfully!");
        fetchOrders(); // Refresh orders
      } else {
        alert("Failed to cancel order.");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("An error occurred while cancelling the order.");
    }
  };



  useEffect(() => {
    if (token) {
      fetchOrders();
    }


  }, [token])

  return (
    <div className="my-orders">
      <h1 className="page-title">My Orders</h1>

      <div className='container'>
        {data.map((order, index) => {
          return (

            <div key={index} className="my-orders-order">
              <div className="order-info">
                <div className="order-icon">🛒</div>
                <div className="order-text">
                  <p>{order.items.map((item, index) => {
                    return item.name + "x" + item.quantity + (index < order.items.length - 1 ? ", " : "");
                  })}</p>
                  <p> £ {order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                </div>
              </div>
              <div className="order-controls">
                <div className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </div>

                {['pending', 'preparing'].includes(order.status.toLowerCase()) && (
                  <div className="cancel-button">
                    <button onClick={() => handleCancelOrder(order._id, "Cancelled")}>Cancel Order</button>
                  </div>
                )}

                <div className="track-button">
                  <button>Track Order</button>
                </div>
              </div>


            </div>





          )
        })}
      </div>




    </div>
  )

}






export default MyOrders;