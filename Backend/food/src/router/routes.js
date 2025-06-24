const foodController = require("../controllers/foodController")
const middleware = require("../mideleware/foodMidleware")
const db = require("../config/db");
const multer = require('multer');

const {
    createRestaurantMenu,
    getAllRestaurantMenus,
    getRestaurantMenuById,
    getMenusByRestaurantId,
    updateRestaurantMenu,
    deleteRestaurantMenu,
    deleteMenusByRestaurantId
} = require('../controllers/MenuController');
//const upload = multer({ dest: 'uploads/' }); // Set the destination for uploaded files

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) // Use current timestamp to avoid filename conflicts
    }
});

const upload = multer({ storage: storage });

module.exports = function(app){
    app.post("/food/:uuid", upload.single('image'), foodMidleware.authorization,  foodController.addFood)
    app.put("/food/:uuid", upload.single('image'), foodMidleware.authorization,  foodController.updateFood)
    app.get("/food", foodController.getAllFoods)
    app.get("/food/:uuid", foodMidleware.authorization, foodController.getFoodById)
    app.delete("/food/:uuid", foodMidleware.authorization,  foodController.deleteFood)
    app.get("/food/name/:name", foodController.getFoodByName)
    app.get("/food/category/:category", foodController.getFoodByCategory)
    app.get("/food/price", foodController.getFoodByPriceRange)
    app.get("/food/restaurant/:uuid", foodController.getFoodByRestaurant)
    app.post("/restaurant-menu", createRestaurantMenu);
    app.put("/restaurant-menu/:uuid", updateRestaurantMenu);
    app.get("/restaurant-menu", getAllRestaurantMenus);
    app.get("/restaurant-menu/:uuid",  getRestaurantMenuById);
    app.delete("/restaurant-menu/:uuid",  deleteRestaurantMenu);
    app.get("/restaurant-menu/restaurant/:restaurantId", getMenusByRestaurantId);
    app.delete("/restaurant-menu/restaurant/:restaurantId", deleteMenusByRestaurantId);
}