import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    driverId: { type: String }, // or ref: "user" if drivers are users
    restaurant: { type: String, required: true },
    distance: { type: String },
    eta: { type: String },
    status: { type: String, default: "available" }, // available, accepted, picked_up, completed
    completedAt: { type: Date },
});

const deliveryModel = mongoose.models.delivery || mongoose.model("delivery", deliverySchema);

export default deliveryModel;
