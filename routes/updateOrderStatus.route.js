const { updateOrderStatusController } = require("../controllers/order.con")


const router = require("express").Router()

const updateOrderStatusRoute = router.post('/', updateOrderStatusController)

module.exports = {
    updateOrderStatusRoute
}