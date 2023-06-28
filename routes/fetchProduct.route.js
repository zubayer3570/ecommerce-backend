const { fetchProductController } = require("../controllers/product.con")


const router = require("express").Router()

const fetchProductRoute = router.get('/:productID', fetchProductController)

module.exports = {
    fetchProductRoute
}