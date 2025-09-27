// new_zub

const { checkJwt } = require("../checkJwt")
const { deleteProductController } = require("../controllers/product.con")


const router = require("express").Router()

const deleteProductRoute = router.post('/', checkJwt, deleteProductController)

module.exports = {
    deleteProductRoute
}