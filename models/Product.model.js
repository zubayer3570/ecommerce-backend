const {Schema} = require("mongoose")

const productSchema = new Schema({
    title: String,
    thumbnail: String,
    images: Array,
    description: String
}, { timestamps: true })

const ProductModel = mongoose.model("product", productSchema)

module.exports = {ProductModel}