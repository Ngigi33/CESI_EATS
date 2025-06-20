const db = require("../config/db");
const orderController = require("../controllers/orderController");
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) // Use current timestamp to avoid filename conflicts
    }
});

const upload = multer({ storage: storage });

module.exports = function(app){
    app.post("/order", orderController.addOrder)
    app.get("/order", orderController.getAllOrders)
    app.get("/order/:id", orderController.getOrderById)
    app.put("/order/:id", orderController.updateOrder)
    app.delete("/order/:id", orderController.deleteOrder)
    app.get("/order/user/:userId", orderController.getOrdersByUserId)
    app.get("/order/restaurant/:restaurantId", orderController.getOrdersByRestaurantId)
}