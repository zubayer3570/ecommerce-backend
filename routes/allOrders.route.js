const { checkJwt } = require("../checkJwt")
const { allOrdersController } = require("../controllers/order.con")
const router = require("express").Router()

const allOrdersRoute = router.get('/', checkJwt, allOrdersController)

module.exports = {
    allOrdersRoute
}