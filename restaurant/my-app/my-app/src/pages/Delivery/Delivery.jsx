import React from 'react';
import './Delivery.css';

const Delivery = () => {
  return (
    <div className="delivery-container">
      <h1>Delivery Information</h1>

      <p>
        At <strong>CESI EATS</strong>, we are dedicated to bringing your favorite meals right to your door, quickly and efficiently — anywhere in <strong>France</strong>!
      </p>

      <h2>1. Delivery Zones</h2>
      <p>
        We proudly deliver <strong>nationwide across France</strong>. No matter where you are, we aim to serve you. Please enter your address on our homepage or during checkout to confirm availability.
      </p>

      <h2>2. Delivery Hours</h2>
      <ul>
        <li>Monday - Friday: 11:00 AM – 2:30 PM (Lunch) & 6:00 PM – 10:30 PM (Dinner)</li>
        <li>Saturday - Sunday: 11:30 AM – 11:00 PM (Continuous)</li>
      </ul>
      <p><em>Note: Hours may vary by restaurant. Check each restaurant’s page for details.</em></p>

      <h2>3. Delivery Fees</h2>
      <ul>
        <li>Standard delivery fee: €3.99</li>
        <li>Free delivery for orders over €25.00</li>
        <li>Some restaurants may have custom fees or minimums, shown at checkout</li>
      </ul>

      <h2>4. Estimated Delivery Time</h2>
      <p>
        Average delivery time: <strong>30–45 minutes</strong> after confirmation. Times may vary due to restaurant prep time, traffic, or weather. You can track your order live via our app or website.
      </p>

      <h2>5. Minimum Order Value</h2>
      <p>
        Minimum order amounts may apply depending on the restaurant. This will be displayed clearly before checkout.
      </p>

      <h2>6. Contactless Delivery</h2>
      <p>
        For safety and convenience, choose <strong>contactless delivery</strong> at checkout. Your order will be left at your door, and you'll be notified upon arrival.
      </p>

      <h2>7. Order Tracking</h2>
      <p>
        After placing your order, you'll receive a confirmation email or SMS with a tracking link. You can also track it directly in your CESI EATS account.
      </p>

      <h2>8. Support</h2>
      <p>
        Need help? Contact our support team:
        <br />
        <strong>Phone:</strong> +33 (0)1 42 68 78 91<br />
        <strong>Email:</strong> <a href="mailto:support@cesieats.com">support@cesieats.com</a>
      </p>

      <p><em>We’re here to make your delivery experience smooth, fast, and satisfying — every time!</em></p>
    </div>
  );
};

export default Delivery;
