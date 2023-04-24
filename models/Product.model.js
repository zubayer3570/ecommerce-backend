const {Schema} = require("mongoose")

const productSchema = new Schema({
    title: String,
    thumbnail: String,
    images: Array,
    description: String
}, { timestamps: true })

export const ProductModel = mongoose.model("product", productSchema)