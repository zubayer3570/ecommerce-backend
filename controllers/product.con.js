const { ProductModel } = require("../models/Product.model");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "da6qlanq1",
    api_key: "855239541721646",
    api_secret: "47BYqZca9ceCBRUwmZ1MjQlO_0o",
    secure: true
})


const addProductController = async (req, res) => {
    const { title, description, price } = req.body
    const cloudinaryResponse = await cloudinary.uploader.upload("upload/" + req.file.filename, { resource_type: "image", use_filename: true })
    const data = {
        title, description, price,
        image: cloudinaryResponse.url
    }
    const newProduct = new ProductModel(data)
    const response = await newProduct.save()
    res.send(response)
}


const fetchProductController = async (req, res) => {
    const { productID } = req.params
    const productData = await ProductModel.findOne({ _id: productID })
    res.send(productData)
}
const fetchAllProductController = async (req, res) => {
    const allProducts = await ProductModel.find({})
    res.send({ allProducts })
}

module.exports = { fetchProductController, fetchAllProductController, addProductController }