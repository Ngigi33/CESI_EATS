import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    customerId: String,
    restaurantId: String,
    cartItems: Array,
    amount: Number,
    currency: String,
    paymentIntentId: String,
    status: String,
})

export default mongoose.model('Payment', PaymentSchema)