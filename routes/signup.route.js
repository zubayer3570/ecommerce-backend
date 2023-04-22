const { signupController } = require("../controllers/user.con")

const router = require("express").Router()
const signupRoute = router.post('/', signupController)
module.exports = { signupRoute };