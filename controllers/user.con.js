const fs = require("fs")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/User.model");
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
        const { name, email, password } = req.body
        const newUser = new UserModel({
            name, email,
            proPic: cloudinaryResponse.url,
            password,
            admin: false,
            emailVerified: false
        })
        const insertedUser = await newUser.save()
        const jwtRes = jwt.sign({ user: insertedUser }, process.env.SECRET_KEY_JWT, { expiresIn: "1h" })
        insertedUser._doc.jwt = jwtRes
        res.send(insertedUser)
    } catch (error) {
        console.log(error)
    }

}


const loginController = async (req, res) => {
    try {
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
    } catch (error) {

    }
}

const userInformation = async (req, res) => {
    try {
        console.log(req.body.userID);
        const userInfo = await UserModel.findById(req.body.userID)
        res.send({ userInfo })
    } catch (error) {
        console.log(error)
    }
}

const allUsersController = async (req, res) => {
    try {
        console.log("hit all users controller");
        const allUsers = await UserModel.find({})
        res.send({ allUsers })
    } catch (error) {
        console.log(error)
    }
}


const updateUserController = async (req, res) => {
    try {
        const { id, title, description, price } = req.body
        const updatedProduct = await ProductModel.findOneAndUpdate({ _id: id }, { title, description, price }, { new: true })
        res.send(updatedProduct)
    } catch (error) {
        console.log(error);
    }
}

const makeAdminController = async (req, res) => {
    try {
        const { userID } = req.body
        const newAdmin = await UserModel.findOneAndUpdate({ _id: userID }, { admin: true }, { new: true })
        res.send({ newAdmin })
    } catch (error) {
        console.log(error);
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { userID } = req.body
        const { authorization } = req.headers
        const deleteReqForUser = await UserModel.findOne({ _id: userID })

        const reqFromUserDecoded = jwt.decode(authorization).user
        const reqFromUser = await UserModel.findOne({ _id: reqFromUserDecoded._id })


        if (deleteReqForUser.admin === true) {
            if (reqFromUser.createdAt.getTime() < deleteReqForUser.createdAt.getTime()) {
                const deletedUser = await UserModel.findOneAndDelete({ _id: userID })
                res.send({ deletedUser })
            } else {
                res.status(403).send({ message: "You don't have permission to delete this user!" })
            }
        } else {
            const deletedUser = await UserModel.findOneAndDelete({ _id: userID })
            res.send({ deletedUser })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { signupController, loginController, userInformation, allUsersController, deleteUserController, makeAdminController }