// backend/MicroServices/Menu/controllers/menuController.js
import Menu from "../models/menuModel.js";

// Get all menus
export const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        console.error("Error getting all menus:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get specific menu by ID
export const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        console.error("Error getting menu by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create a menu
export const createMenu = async (req, res) => {
    try {
        const menu = new Menu(req.body);
        const validationError = menu.validateSync();
        if (validationError) {
            const errors = Object.keys(validationError.errors).map(
                (key) => validationError.errors[key].message
            );
            return res.status(400).json({ errors });
        }
        const savedMenu = await menu.save();
        res.status(201).json(savedMenu);
    } catch (error) {
        console.error("Error creating menu:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Edit a menu
export const updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json(menu);
    } catch (error) {
        console.error("Error updating menu:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a menu
export const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndRemove(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting menu:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};