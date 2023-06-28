const { allUsersController } = require("../controllers/user.con")

const router = require("express").Router()

const allUsersRoute = router.get('/', allUsersController)

module.exports = {
    allUsersRoute
}