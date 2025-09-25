const { Schema, default: mongoose } = require("mongoose")

const orderSchema = new Schema({
    email: String,
    orderedProductID: String,
    productData: Object,
    quantity: String,
    totalAmount: Number,
    orderDate: String,
    shippingStatus: String
}, { timestamps: true })

const OrderModel = mongoose.model("order", orderSchema)
module.exports = {
    OrderModel
}

