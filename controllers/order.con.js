const { OrderModel } = require("../models/Orders.model")
const { calculateAmount } = require("../calculateAmount")

const getMyOrdersController = async (req, res) => {
    const { email } = req.body
    const myOrders = await OrderModel.find({ email })
    res.send(myOrders)
}
const addMyOrderController = async (req, res) => {
    const data = req.body
    const date = new Date()
    const newOrder = new OrderModel({
        email: data.email,
        productData: data.productData,
        quantity: data.quantity,
        totalAmount: calculateAmount(data),
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
    await OrderModel.findOneAndUpdate({ _id: orderID }, {shippingStatus: text})
    res.send({ message: "Updated!" })
}

module.exports = {
    getMyOrdersController,
    addMyOrderController,
    cancelOrderController,
    allOrdersController,
    fetchOrderController,
    updateOrderStatusController
}