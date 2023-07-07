const { checkJwt } = require("../checkJwt")
const { allUsersController } = require("../controllers/user.con")

const router = require("express").Router()

const allUsersRoute = router.get('/', checkJwt, allUsersController)

module.exports = {
    allUsersRoute
}