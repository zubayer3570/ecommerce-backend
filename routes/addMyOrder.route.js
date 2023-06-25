const { addMyOrderController } = require("../controllers/order.con")

const router = require("express").Router()

const addMyOrderRoute = router.post("/", addMyOrderController)

module.exports = {
    addMyOrderRoute
}