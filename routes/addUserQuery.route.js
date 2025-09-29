const { addUserQueryController } = require("../controllers/userQuery.con")

const router = require("express").Router()

const addUserQueryRoute = router.post("/", addUserQueryController)

module.exports = {
    addUserQueryRoute
}