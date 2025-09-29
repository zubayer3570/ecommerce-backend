const { checkJwt } = require("../checkJwt")
const { deleteUserController } = require("../controllers/user.con")


const router = require("express").Router()

const deleteUserRoute = router.post('/', checkJwt, deleteUserController)

module.exports = {
    deleteUserRoute
}