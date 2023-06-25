const { OrderModel } = require("../models/Orders.model")
const { calculateAmount } = require("../calculateAmount")

const getMyOrdersController = async (req, res) => {
    const { email } = req.body
    const myOrders = await OrderModel.find({ email })
    res.send(myOrders)
}

const addMyOrderController = async (req, res) => {
    const data = req.body
    console.log(data)
    const newOrder = new OrderModel({
        email: data.email,
        productData: data.productData,
        quantity: data.quantity,
        totalAmount: calculateAmount(data),
        paid: false,
        orderDate: new Date().getDate(),
        shippingStatus: "Order Taken"
    })
    const newOrderSaved = await newOrder.save()
    res.send(newOrderSaved)
}

module.exports = {
    getMyOrdersController,
    addMyOrderController
}