const { fetchAllProductController } = require("../controllers/product.con")


const router = require("express").Router()

const fetchAllProductRoute = router.get('/', fetchAllProductController)

module.exports = {
    fetchAllProductRoute
}