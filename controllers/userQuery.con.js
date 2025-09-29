const fs = require("fs")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const { UserQueryModel } = require("../models/UserQuery.model");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "da6qlanq1",
    api_key: "855239541721646",
    api_secret: "47BYqZca9ceCBRUwmZ1MjQlO_0o",
    secure: true
})

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "zubayer3570@gmail.com",
        pass: "xvdzigizkyojxqon"
    }
})

const addUserQueryController = async (req, res) => {
    try {
        const { name, email, message } = req.body
        const newUserQuery = new UserQueryModel({ name, email, message })
        const insertedUserQuery = await newUserQuery.save()
        res.send(insertedUserQuery)
    } catch (error) {
        console.log(error)
    }
}

const allUserQueriesController = async (req, res) => {
    try {
        const allUserQueries = await UserQueryModel.find({})
        // console.log(allUserQueries)
        res.send({ allUserQueries })
    } catch (error) {
        console.log(error)
    }
}

const queryReplyController = async (req, res) => {
    console.log("here")
    try {
        const { queryID, subject, message } = req.body
        const userQuery = await UserQueryModel.findOne({ _id: queryID })
        if (!userQuery) {
            return res.status(404).send({ message: "Query not found" })
        }

        const mail = {
            to: userQuery.email,
            subject: subject,
            html: `
            <p>Dear ${userQuery.name},</p>
            <p>We are writing to address the query you submitted to our support team. We appreciate you reaching out to us and value your feedback.</p>
            <p>Regarding your query, we would like to inform you that:</p>
            <p>${message}</p>
            <p>Your Query: ${userQuery.message}</p>
            <p>If you have any further questions or need additional assistance, please do not hesitate to contact us. We are here to help and ensure that your experience with our services is satisfactory.</p>
            <p>Thank you for choosing our services. We look forward to serving you in the future.</p>
            <p>Best regards,</p>
            <p>GadgetGeek Support Team</p>
            `,
        }

        const output = await transporter.sendMail(mail)
        console.log("Message sent: %s", output)

        transporter.close()

        res.send({ message: "Reply sent successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
}

const deleteQueryController = async (req, res) => {
    try {
        const { queryID } = req.params
        const deletedQuery = await UserQueryModel.findByIdAndDelete(queryID)
        if (!deletedQuery) {
            return res.status(404).send({ message: "Query not found" })
        }
        res.send({ deletedQuery })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
}




module.exports = { addUserQueryController, allUserQueriesController, queryReplyController, deleteQueryController }