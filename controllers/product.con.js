const data = require("../data");

const { ProductModel } = require("../models/Product.model");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "da6qlanq1",
    api_key: "855239541721646",
    api_secret: "47BYqZca9ceCBRUwmZ1MjQlO_0o",
    secure: true
})


const addProductController = async (req, res) => {
    try {
        const { title, description, price } = req.body
        const cloudinaryResponse = await cloudinary.uploader.upload("upload/" + req.file.filename, { resource_type: "image", use_filename: true })
        if (!cloudinaryResponse.url.includes("https")) {
            cloudinaryResponse.url.split("http").join("https")
        }
        const data = {
            title, description, price, image: cloudinaryResponse.url
        }
        const newProduct = new ProductModel(data)
        const response = await newProduct.save()
        res.send(response)
    } catch (error) {
        console.log(error);
    }
}


// const addallproduct = async (req, res) => {
//     try {
//         const response = await ProductModel.insertMany(data.products)
//         res.send(response)
//     } catch (error) {
//         console.log(error);
//     }
// }


const updateProductController = async (req, res) => {
    try {
        const { id, title, description, price } = req.body
        const updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, { title, description, price }, { new: true })
        res.send(updatedProduct)
    } catch (error) {
        console.log(error);
    }
}

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.body
        const deletedProduct = await ProductModel.findOneAndDelete({ _id: id })
        console.log(deletedProduct);
        res.send(deletedProduct)
    } catch (error) {
        console.log(error);
    }
}


const fetchProductController = async (req, res) => {
    try {
        const { productID } = req.params
        const productData = await ProductModel.findOne({ _id: productID })
        res.send(productData)
    } catch (error) {

    }
}
const fetchAllProductController = async (req, res) => {
    try {
        const allProducts = await ProductModel.find({})
        res.send({ allProducts })
    } catch (error) {

    }
}

module.exports = {
    fetchProductController,
    fetchAllProductController,
    addProductController,
    updateProductController,
    deleteProductController
}