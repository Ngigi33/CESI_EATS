export const publicAccess = (req, res) => {
  res.status(200).send("Home dashboard");
};

export const customerBoard = (req, res) => {
  res.status(200).send("Customer Dashboard: View orders, track delivery");
};

export const deliveryDriverBoard = (req, res) => {
  res.status(200).send("Delivery Driver Dashboard: Assigned deliveries and routes.");
};

export const restaurantOwnerBoard = (req, res) => {
  res.status(200).send("Restaurant Owner Dashboard: Manage menu, view orders.");
};

export const salesAnalyticsBoard = (req, res) => {
  res.status(200).send("Sales & Analytics Dashboard: View performance reports.");
};
