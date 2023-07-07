const {Schema, default: mongoose} = require("mongoose")

const visitorSchema = new Schema({
    ip: String
}, { timestamps: true })

const VisitorModel = mongoose.model("visitor", visitorSchema)

module.exports = {VisitorModel}