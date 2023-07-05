const path = require("path")
const { addProductController } = require("../controllers/product.con")
const route = require("express").Router()

// ******product image upload********
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = "upload/"
        cb(null, path)
    },
    filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-")
        cb(null, fileName + "-" + Date.now() + fileExt)
    }
})

const upload = multer({ storage })

const addProductRoute = route.post('/', upload.single("productPic"), addProductController)

module.exports = {addProductRoute}