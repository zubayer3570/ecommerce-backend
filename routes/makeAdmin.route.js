const { checkJwt } = require("../checkJwt")
const { makeAdminController } = require("../controllers/user.con")

const router = require("express").Router()

const makeAdminRoute = router.post('/', checkJwt, makeAdminController)

module.exports = {
    makeAdminRoute
}