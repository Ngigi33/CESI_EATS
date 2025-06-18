const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/payments', (req, res) => {
  const { order_id, user_id, amount, payment_method } = req.body;

  console.log(`💳 Received payment request for order ${order_id}`);
  console.log(`➡️ User: ${user_id}, Amount: ${amount}, Method: ${payment_method}`);

  // Simulate payment logic
  const isSuccess = true; // 90% success rate

  if (isSuccess) {
    return res.json({
      status: 'success',
      payment_id: `PAY-${Math.floor(Math.random() * 100000)}`,
    });
  } else {
    return res.json({
      status: 'failed',
      reason: 'Insufficient funds or declined card',
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Mock Payment Microservice running on port ${PORT}`);
});
