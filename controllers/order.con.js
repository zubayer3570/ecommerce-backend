const { OrderModel } = require("../models/Orders.model")
const { calculateAmount } = require("../calculateAmount")

const getMyOrdersController = async (req, res) => {
    const { email } = req.body
    const myOrders = await OrderModel.find({ email })
    res.send(myOrders)
}
const addMyOrderController = async (req, res) => {
    const data = req.body
    const newOrder = new OrderModel({
        email: data.email,
        productData: data.productData,
        quantity: data.quantity,
        totalAmount: calculateAmount(data),
        orderDate: new Date().getDate(),
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

module.exports = {
    getMyOrdersController,
    addMyOrderController,
    cancelOrderController
}