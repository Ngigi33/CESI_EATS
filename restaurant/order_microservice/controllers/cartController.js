// controllers/cartController.js
import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {

    const { userId, itemId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, cartData: {} });
        }
        const cartData = cart.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        cart.cartData = cartData;
        await cart.save();
        res.json({ success: true, message: "Item added to cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) return res.json({ success: true, message: "Cart is empty" });

        const cartData = cart.cartData || {};
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] <= 0) delete cartData[itemId];
        }

        cart.cartData = cartData;
        await cart.save();

        res.json({ success: true, message: "Item removed from cart" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

};

export const getCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        res.json({ success: true, cartData: cart?.cartData || {} });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// export const createTestUser = async (req, res) => {
//     try {
//         const newUser = await userModel.create({ name: "Test User", cartData: {} });
//         res.json({ success: true, userId: newUser._id });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

