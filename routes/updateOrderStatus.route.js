const { checkJwt } = require("../checkJwt")
const { updateOrderStatusController } = require("../controllers/order.con")


const router = require("express").Router()

const updateOrderStatusRoute = router.post('/', checkJwt, updateOrderStatusController)

module.exports = {
    updateOrderStatusRoute
}