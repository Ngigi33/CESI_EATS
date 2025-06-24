// backend/MicroServices/Menu/routes/menuRoute.js
import express from "express";
import * as menuController from "../controllers/menuController.js"; // Corrected import path and filename

const router = express.Router();

router.get("/", menuController.getAllMenus);
router.get("/:id", menuController.getMenuById);
router.post("/", menuController.createMenu);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

export default router;