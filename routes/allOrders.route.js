const { allOrdersController } = require("../controllers/order.con")
const router = require("express").Router()

const allOrdersRoute = router.get('/', allOrdersController)

module.exports = {
    allOrdersRoute
}