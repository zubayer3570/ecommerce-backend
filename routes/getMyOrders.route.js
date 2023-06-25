const { getMyOrdersController } = require("../controllers/order.con")

const router = require("express").Router()

const getMyOrdersRoute = router.post("/", getMyOrdersController)

module.exports = {
    getMyOrdersRoute
}