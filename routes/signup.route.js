const { signupController } = require("../controllers/user.con")
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploaded/")
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now()
        cb(null, fileName + fileExt)
    }
})
const upload = multer({ storage })

const router = require("express").Router()
const signupRoute = router.post('/', upload.single("profilePic"), signupController)
module.exports = { signupRoute };