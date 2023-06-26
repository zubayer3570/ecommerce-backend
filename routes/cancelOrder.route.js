const { cancelOrderController } = require("../controllers/order.con")

const router = require("express").Router()

const cancelOrderRoute = router.post("/", cancelOrderController)

module.exports = {
    cancelOrderRoute
}