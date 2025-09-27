// new_zub

const { checkJwt } = require("../checkJwt")
const { updateProductController } = require("../controllers/product.con")


const router = require("express").Router()

const updateProductRoute = router.post('/', checkJwt, updateProductController)

module.exports = {
    updateProductRoute
}