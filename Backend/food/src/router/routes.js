const foodController = require("../controllers/foodController")
const db = require("../config/db");
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
    app.post("/food/:uuid", upload.single('image'), foodController.addFood)
    app.put("/food/:uuid", upload.single('image'), foodController.updateFood)
    app.get("/food", foodController.getAllFoods)
    app.get("/food/:uuid", foodController.getFoodById)
    app.delete("/food/:uuid", foodController.deleteFood)
    app.get("/food/name/:name", foodController.getFoodByName)
    app.get("/food/category/:category", foodController.getFoodByCategory)
    app.get("/food/price", foodController.getFoodByPriceRange)
    app.get("/food/restaurant/:uuid", foodController.getFoodByRestaurant)
}