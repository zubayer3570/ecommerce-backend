const { OrderModel } = require("../models/Orders.model")
const { ProductModel } = require("../models/Product.model")

const getMyOrdersController = async (req, res) => {
    const { email } = req.body
    const myOrders = await OrderModel.find({ email })
    res.send(myOrders)
}
const addMyOrderController = async (req, res) => {
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
}
const cancelOrderController = async (req, res) => {
    const data = req.body
    const result = await OrderModel.findOneAndDelete({ _id: data._id })
    res.send(result)
}

const allOrdersController = async (req, res) => {
    const allOrders = await OrderModel.find({})
    res.send({ allOrders })
}
const fetchOrderController = async (req, res) => {
    const { orderID } = req.params
    const selectedOrder = await OrderModel.findOne({ _id: orderID })
    res.send(selectedOrder)
}
const updateOrderStatusController = async (req, res) => {
    const { orderID, text } = req.body
    const updatedOrder = await OrderModel.findOneAndUpdate({ _id: orderID }, { shippingStatus: text }, {new: true})
    res.send(updatedOrder)
}

module.exports = {
    getMyOrdersController,
    addMyOrderController,
    cancelOrderController,
    allOrdersController,
    fetchOrderController,
    updateOrderStatusController
}