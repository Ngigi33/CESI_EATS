import React from 'react';
import './PrivacyPolicy.css'; // Ajoute un fichier CSS si tu veux styliser

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>

      <p>
        Your privacy is critically important to us at CESI EATS. This Privacy Policy outlines how CESI EATS ("we", "our", or "us") collects, uses, maintains, and discloses information collected from users (each, a "User") of the <a href="https://www.cesieats.com">cesieats.com</a> website ("Site") and our mobile application.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Identification Information:</strong> We may collect personal information such as name, email address, mailing address, phone number, and credit card details when Users interact with our services.
        </li>
        <li>
          <strong>Non-personal Identification Information:</strong> This includes browser name, device type, operating system, and internet service provider used.
        </li>
        <li>
          <strong>Location Information:</strong> With your consent, we may collect location data to provide location-based services.
        </li>
      </ul>

      <h2>2. How We Use Collected Information</h2>
      <ul>
        <li>To process orders and payments.</li>
        <li>To improve customer service and user experience.</li>
        <li>To personalize user interactions with the platform.</li>
        <li>To enhance and improve our services.</li>
        <li>To send updates, emails, and respond to inquiries.</li>
      </ul>

      <h2>3. How We Protect Your Information</h2>
      <p>
        We implement robust security measures including SSL encryption to safeguard your data against unauthorized access, modification, or disclosure.
      </p>

      <h2>4. Sharing Your Personal Information</h2>
      <ul>
        <li>We do not sell, trade, or rent Users' personal data.</li>
        <li>Aggregated demographic info may be shared with partners.</li>
        <li>We may use third-party services for newsletters or surveys with your consent.</li>
        <li>Information is shared with restaurants and delivery partners only to fulfill orders.</li>
      </ul>

      <h2>5. Third-Party Websites</h2>
      <p>
        Our Site may link to third-party websites. We are not responsible for their content or privacy practices. Users should review the privacy policies of any external sites they visit.
      </p>

      <h2>6. Your Rights (e.g., GDPR, CCPA)</h2>
      <p>You may have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal data.</li>
        <li>Object to data processing.</li>
        <li>Request data portability.</li>
      </ul>
      <p>Please contact us to exercise any of these rights.</p>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy at any time. We encourage users to check this page regularly to stay informed of any changes.
      </p>

      <h2>8. Your Acceptance of These Terms</h2>
      <p>
        By using this site, you accept this policy. Continued use after changes are posted indicates your agreement to those changes.
      </p>

      <h2>Contact Us</h2>
      <p>If you have any questions, please contact us:</p>
      <p>
        <strong>CESI EATS</strong><br />
        Email: <a href="mailto:contact@cesieats.com">contact@cesieats.com</a><br />
        Phone: +33 (0)1 42 68 78 91
      </p>

      <p><em>This document was last updated on June 25, 2025.</em></p>
    </div>
  );
};

export default PrivacyPolicy;
