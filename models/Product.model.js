const {Schema, default: mongoose} = require("mongoose")

const productSchema = new Schema({
    title: String,
    thumbnail: String,
    image: String,
    description: String,
    stock: Number,
    rating: Number,
    price: Number
}, { timestamps: true })

const ProductModel = mongoose.model("product", productSchema)

module.exports = {ProductModel}