const { Schema, default: mongoose } = require("mongoose")

const orderSchema = new Schema({
    orderedProductID: String,
    quantity: String,
    totalAmount: Number,
    paid: Boolean,
    orderDate: String,
    shipping: String
}, { timestamps: true })

export const OrderModel = mongoose.model("order", orderSchema)