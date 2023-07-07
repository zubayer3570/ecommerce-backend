const { checkJwt } = require("../checkJwt")
const { addMyOrderController } = require("../controllers/order.con")

const router = require("express").Router()

const addMyOrderRoute = router.post("/", checkJwt, addMyOrderController)

module.exports = {
    addMyOrderRoute
}