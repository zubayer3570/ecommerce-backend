const { Schema, default: mongoose } = require("mongoose")

const orderSchema = new Schema({
    name: String,
    email: String,
    message: String
}, { timestamps: true })

const OrderModel = mongoose.model("order", orderSchema)
module.exports = {
    OrderModel
}