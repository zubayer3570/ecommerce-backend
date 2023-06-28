const {Schema, default: mongoose} = require("mongoose")

const productSchema = new Schema({
    title: String,
    thumbnail: String,
    images: Array,
    description: String,
    stock: Number,
    rating: Number
}, { timestamps: true })

const ProductModel = mongoose.model("product", productSchema)

module.exports = {ProductModel}