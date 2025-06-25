// models/cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    cartData: { type: Object, default: {} }
});

export default mongoose.model('Cart', cartSchema);
