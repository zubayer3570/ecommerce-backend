const { fetchProductController } = require("../controllers/product.con")
const { userInformation } = require("../controllers/user.con")


const router = require("express").Router()

const userInformationRoute = router.post('/', userInformation)

module.exports = {
    userInformationRoute
}