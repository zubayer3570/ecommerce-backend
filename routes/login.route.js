const { loginController } = require("../controllers/user.con")

const router = require("express").Router()
const loginRoute = router.post('/', loginController)
module.exports = { loginRoute };