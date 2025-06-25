const API_BASE = 'http://localhost';
const ORDER_API = `${API_BASE}:3001`;
const DELIVERY_API = `${API_BASE}:3002`;

document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const user_id = document.getElementById('userId').value;
    const restaurant_id = document.getElementById('restaurantId').value;
    const item_id = document.getElementById('itemId').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    if (!item_id || isNaN(quantity) || isNaN(price)) {
        alert('Please fill all item fields correctly.');
        return;
    }

    const items = [
        {
            item_id,
            quantity,
            price,
        },
    ];

    try {
        const res = await axios.post(`${ORDER_API}/orders`, {
            user_id,
            restaurant_id,
            items,
        });

        alert(`✅ Order Placed! Order ID: ${res.data.order_id}`);
        // document.getElementById('trackOrderId').value = res.data.order_id;
        // document.getElementById('orderForm').reset();
    } catch (err) {
        alert(`❌ Error placing order: ${err.response?.data?.error || err.message}`);
    }
});

document.getElementById('updateStatusForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const orderId = document.getElementById('updateOrderId').value.trim();
    const status = document.getElementById('newStatus').value;

    if (!orderId || !status) {
        alert('Please enter Order ID and select a new status');
        return;
    }

    try {
        const res = await axios.patch(`${ORDER_API}/orders/${orderId}/status`, { status });
        document.getElementById('updateStatusOutput').textContent = JSON.stringify(res.data, null, 2);
    } catch (err) {
        alert(`❌ Error updating order status: ${err.response?.data?.error || err.message}`);
    }
});

async function getOrdersByUser() {
  const userId = document.getElementById('searchUserId').value;

  if (!userId) return alert('Please enter a user ID');

  try {
    const res = await axios.get(`${ORDER_API}/orders/user/${userId}`);
    document.getElementById('userOrdersOutput').textContent = JSON.stringify(res.data, null, 2);
  } catch (err) {
    alert(`❌ Error fetching user orders: ${err.response?.data?.error || err.message}`);
  }
}


// async function trackOrder() {
//     const orderId = document.getElementById('trackOrderId').value;
//     if (!orderId) return alert('Please enter an order ID');

//     try {
//         const orderRes = await axios.get(`${ORDER_API}/orders/${orderId}`);
//         const deliveryRes = await axios.get(`${DELIVERY_API}/api/deliveries/order/${orderId}`);

//         document.getElementById('orderStatusOutput').textContent = JSON.stringify(
//             {
//                 order: orderRes.data,
//                 delivery: deliveryRes.data,
//             },
//             null,
//             2
//         );
//     } catch (err) {
//         alert(`❌ Error fetching order: ${err.response?.data?.error || err.message}`);
//     }
// }

// async function confirmDelivery() {
//     const deliveryId = document.getElementById('deliveryId').value;
//     const role = document.getElementById('confirmRole').value;

//     if (!deliveryId) return alert('Please enter a delivery ID');

//     try {
//         const res = await axios.patch(`${DELIVERY_API}/api/deliveries/${deliveryId}/confirm`, {
//             role,
//         });

//         document.getElementById('confirmOutput').textContent = JSON.stringify(res.data, null, 2);
//     } catch (err) {
//         alert(`❌ Error confirming delivery: ${err.response?.data?.error || err.message}`);
//     }
// }
