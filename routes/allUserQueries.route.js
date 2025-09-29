const { checkJwt } = require("../checkJwt")
const { allUserQueriesController } = require("../controllers/userQuery.con")
const router = require("express").Router()

const allUserQueriesRoute = router.get('/', checkJwt, allUserQueriesController)

module.exports = { allUserQueriesRoute }