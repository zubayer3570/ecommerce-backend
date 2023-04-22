const { UserModel } = require("../schemas/User.model")

const signupController = async (req, res) => {
    const data = req.body
    const newUser = new UserModel({
        name: "zubayer",
        email: "zubayer3570@gmail.com",
        proPic: "https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg",
        password: "1111111",
        verified: true
    })
    const insertedUser = await newUser.save()
    res.send(insertedUser)
}
const loginController = (req, res) => {

}

module.exports = { signupController, loginController }