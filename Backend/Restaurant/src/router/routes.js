const db = require("../config/db");
const restaurantController = require("../controllers/restaurantController");
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
    app.post("/restaurant", upload.single('image'), restaurantController.addRestaurant)
    app.get("/restaurant", restaurantController.getAllRestaurants)
    app.get("/restaurant/:id", restaurantController.getRestaurantById)
    app.put("/restaurant/:id", restaurantController.updateRestaurant)
    app.delete("/restaurant/:id", restaurantController.deleteRestaurant)
    app.get("/restaurant/name/:name", restaurantController.getRestaurantByName)
}