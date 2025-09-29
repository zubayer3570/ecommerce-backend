const { Schema, default: mongoose } = require("mongoose")

const orderSchema = new Schema({
    name: String,
    email: String,
    message: String
}, { timestamps: true })

const UserQueryModel = mongoose.model("userQuery", orderSchema)
module.exports = { UserQueryModel }