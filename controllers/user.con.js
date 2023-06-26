const { UserModel } = require("../models/User.model")
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "da6qlanq1",
    api_key: "855239541721646",
    api_secret: "47BYqZca9ceCBRUwmZ1MjQlO_0o",
    secure: true
})
const signupController = async (req, res) => {
    try {
        const userExists = await UserModel.findOne({ email: req.body.email })
        if (userExists) {
            res.send({message: "User Already Exists!"})
            return;
        }
        if(req.file){
            res.send({message: "Upload Picture!"})
            return;
        }

        const cloudinaryResponse = await cloudinary.uploader.upload("./uploaded/" + req.file.filename, { resource_type: "image", use_filename: true })
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            proPic: cloudinaryResponse.url.split("upload/").join("upload/q_10/"),
            password: req.body.password,
            verified: true
        })
        const insertedUser = await newUser.save()
        res.send(insertedUser)
    } catch (error) {
        console.log(res)
    }

}
const loginController = async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
        if (user.password == req.body.password) {
            res.send(user)
        } else {
            res.send({ message: "Password is incorrect!!!" })
        }
    } else {
        res.send({ message: "User does not exists!!!" })
    }
}

module.exports = { signupController, loginController }