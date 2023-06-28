const { fetchOrderController } = require("../controllers/order.con")


const router = require("express").Router()

const fetchOrderRoute = router.get('/:orderID', fetchOrderController)

module.exports = {
    fetchOrderRoute
}