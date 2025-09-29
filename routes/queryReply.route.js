const { checkJwt } = require("../checkJwt")
const { queryReplyController } = require("../controllers/userQuery.con")

const router = require("express").Router()

const queryReplyRoute = router.post('/', checkJwt, queryReplyController)

module.exports = {
    queryReplyRoute
}