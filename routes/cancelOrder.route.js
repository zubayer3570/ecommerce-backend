const { checkJwt } = require("../checkJwt")
const { cancelOrderController } = require("../controllers/order.con")

const router = require("express").Router()

const cancelOrderRoute = router.post("/", checkJwt, cancelOrderController)

module.exports = {
    cancelOrderRoute
}