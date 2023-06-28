const { ProductModel } = require("../models/Product.model");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "da6qlanq1",
    api_key: "855239541721646",
    api_secret: "47BYqZca9ceCBRUwmZ1MjQlO_0o",
    secure: true
})

const fetchProductController = async (req, res)=>{
    const {productID} = req.params
    const productData = await ProductModel.findOne({_id: productID})
    res.send(productData)
}
const fetchAllProductController = async (req, res)=>{
    const allProducts = await ProductModel.find({})
    res.send({allProducts})
}

module.exports = { fetchProductController, fetchAllProductController }