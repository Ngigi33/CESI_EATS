const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true,
        default : uuidv4
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    foodItems: [{
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const orderModel = mongoose.models.order || mongoose.model('Order', orderSchema);
module.exports = orderModel;
