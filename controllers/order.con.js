const { OrderModel } = require("../models/Orders.model")
const { ProductModel } = require("../models/Product.model")

const getMyOrdersController = async (req, res) => {
    try {
        const { email } = req.body
        const myOrders = await OrderModel.find({ email }).populate('productData')
        res.send(myOrders)
    } catch (error) {
        console.log(error);
    }
}
const addMyOrderController = async (req, res) => {
    try {
        const data = req.body
        const date = new Date()
        const product = await ProductModel.findOne({ _id: data.productData._id })
        const totalAmount = product.price * data.quantity * 100
        const newOrder = new OrderModel({
            email: data.email,
            productData: data.productData,
            quantity: data.quantity,
            totalAmount,
            orderDate: date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
            shippingStatus: "Order Taken"
        })
        const newOrderSaved = await newOrder.save()
        res.send(newOrderSaved)
    } catch (error) {

    }
}
const cancelOrderController = async (req, res) => {
    try {
        const data = req.body
        const result = await OrderModel.findOneAndDelete({ _id: data._id })
        res.send(result)
    } catch (error) {

    }
}

const allOrdersController = async (req, res) => {
    try {
        const allOrders = await OrderModel.find({}).populate('productData')
        res.send({ allOrders })
    } catch (error) {

    }
}
const fetchOrderController = async (req, res) => {
    try {
        const { orderID } = req.params
        const selectedOrder = await OrderModel.findOne({ _id: orderID }).populate('productData')
        res.send(selectedOrder)
    } catch (error) {

    }
}
const updateOrderStatusController = async (req, res) => {
    try {
        const { orderID, text } = req.body
        const updatedOrder = await OrderModel.findOneAndUpdate({ _id: orderID }, { shippingStatus: text }, { new: true }).populate("productData")
        res.send(updatedOrder)
    } catch (error) {

    }
}

module.exports = {
    getMyOrdersController,
    addMyOrderController,
    cancelOrderController,
    allOrdersController,
    fetchOrderController,
    updateOrderStatusController
}