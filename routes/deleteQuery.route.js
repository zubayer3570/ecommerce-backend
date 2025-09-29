// new_zub

const { checkJwt } = require("../checkJwt")
const { deleteQueryController } = require("../controllers/userQuery.con")


const router = require("express").Router()

const deleteQueryRoute = router.delete('/:queryID', checkJwt, deleteQueryController)

module.exports = {
    deleteQueryRoute
}