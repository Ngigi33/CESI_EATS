import express from 'express';
import Stripe from 'stripe';
import Payment from '../models/Payment.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { cartItems, customerId, restaurantId } = req.body;

  const amount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { customerId, restaurantId },
    });

    // Save payment
    await Payment.create({
      customerId,
      restaurantId,
      cartItems,
      amount,
      currency: 'usd',
      paymentIntentId: paymentIntent.id,
      status: 'created',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stripe webhook (optional for real-time updates)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    await Payment.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { status: 'succeeded' }
    );
  }

  res.status(200).json({ received: true });
});

// Customer payment history
router.get('/history/customer/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const payments = await Payment.find({ customerId }).sort({ createdAt: -1 });
  res.json(payments);
});

// Restaurant payment history
router.get('/history/restaurant/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const payments = await Payment.find({ restaurantId }).sort({ createdAt: -1 });
  res.json(payments);
});

export default router;
