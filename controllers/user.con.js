const fs = require("fs")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/User.model");
const { VisitorModel } = require("../models/Visitor.model");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "da6qlanq1",
    api_key: "855239541721646",
    api_secret: "47BYqZca9ceCBRUwmZ1MjQlO_0o",
    secure: true
})

const signupController = async (req, res) => {
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload("upload/" + req.file.filename, { resource_type: "image", use_filename: true })
        console.log(cloudinaryResponse.secure_url)
        const { name, email, password } = req.body
        if (!cloudinaryResponse.url.includes("https")) {
            cloudinaryResponse.url.split("http").join("https")
        }
        const newUser = new UserModel({
            name, email,
            proPic: cloudinaryResponse.url.split("upload/").join("upload/q_20/"),
            password,
            admin: false,
            emailVerified: false
        })
        const insertedUser = await newUser.save()
        const jwtRes = jwt.sign({ user: insertedUser }, "hello", { expiresIn: "1h" })
        insertedUser._doc.jwt = jwtRes
        res.send(insertedUser)
    } catch (error) {
        console.log(error)
    }

}


const loginController = async (req, res) => {
    if (!req.body.email) {
        res.send({})
        return;
    }
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        if (req.body.loginMethod) {
            const { name, email, proPic } = req.body
            const newUser = new UserModel({
                name, email, proPic,
                admin: false,
                emailVerified: true
            })
            user = await newUser.save()
        }
    }
    if (user) {
        const jwtRes = jwt.sign({ user }, process.env.SECRET_KEY_JWT, { expiresIn: "1h" })
        user._doc.jwt = jwtRes
    }
    res.send(user)
}

const allUsersController = async (req, res) => {
    const allUser = UserModel.find({})
    res.send(allUser)
}

module.exports = { signupController, loginController, allUsersController }