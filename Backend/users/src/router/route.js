const db = require("../config/db");
const userController = require("../controllers/userController");
const auth = require("../midleware/usermiddleware");
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
    app.post("/register", upload.single('image'),  userController.register)
    app.post("/login",  userController.login)
    app.get("/user", auth, userController.getAllUsers)
    app.get("/user/:id", auth, userController.getUserById)
    app.put("/user/update/:id", auth, userController.updateUser)
    app.delete("/user/delete/:id", auth, userController.deleteUser)
    app.get("/user/name/:name", auth, userController.getUserByName)
};