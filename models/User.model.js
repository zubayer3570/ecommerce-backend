const { Schema } = require("mongoose")
const { mongoose } = require("mongoose")

const userSchema = new Schema({
    name: String,
    email: String,
    proPic: String,
    emailVerified: Boolean,
    admin: Boolean
}, { timestamps: true })

const UserModel = mongoose.model("user", userSchema)
module.exports = { UserModel };