const { calculateAmount } = require("./calculateAmount")
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE)
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://database-user-1:databaseofzubayer@cluster0.1f3iy.mongodb.net/e-commerce")

app.use(express.json())
app.use(cors({
    origin: "*"
}))

const { signupRoute } = require("./routes/signup.route")
const { loginRoute } = require("./routes/login.route")
const { addMyOrderRoute } = require("./routes/addMyOrder.route")
const { getMyOrdersRoute } = require("./routes/getMyOrders.route")
const { cancelOrderRoute } = require("./routes/cancelOrder.route")
const { allOrdersRoute } = require("./routes/allOrders.route")
const { userInformationRoute } = require("./routes/userInformation.route")
const { allUsersRoute } = require("./routes/allUsers.route")
const { makeAdminRoute } = require("./routes/makeAdmin.route")
const { deleteUserRoute } = require("./routes/deleteUser.route")
const { fetchAllProductRoute } = require("./routes/fetchAllProduct.route")
const { fetchProductRoute } = require("./routes/fetchProduct.route")
const { fetchOrderRoute } = require("./routes/fetchOrder.route")
const { updateOrderStatusRoute } = require("./routes/updateOrderStatus.route")
const { addProductRoute } = require("./routes/addProduct.route")
const { updateProductRoute } = require("./routes/updateProduct.route")
const { deleteProductRoute } = require("./routes/deleteProduct.route")
const { addUserQueryRoute } = require("./routes/addUserQuery.route")
const { allUserQueriesRoute } = require("./routes/allUserQueries.route")
const { queryReplyRoute } = require("./routes/queryReply.route")
const { deleteQueryRoute } = require("./routes/deleteQuery.route")
const { ProductModel } = require("./models/Product.model")


app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/my-orders', getMyOrdersRoute)
app.use('/add-order', addMyOrderRoute)
app.use('/cancel-order', cancelOrderRoute)
app.use('/all-orders', allOrdersRoute)
app.use('/user-information', userInformationRoute)
app.use('/all-users', allUsersRoute)
app.use('/make-admin', makeAdminRoute)
app.use('/delete-user', deleteUserRoute)
app.use('/add-product', addProductRoute)
app.use('/fetch-product', fetchProductRoute)
app.use('/all-products', fetchAllProductRoute)
app.use('/fetch-order', fetchOrderRoute)
app.use('/update-order-status', updateOrderStatusRoute)
app.use('/update-product', updateProductRoute)
app.use('/delete-product', deleteProductRoute)
app.use('/add-query', addUserQueryRoute)
app.use('/all-user-queries', allUserQueriesRoute)
app.use('/query-reply', queryReplyRoute)
app.use('/delete-query', deleteQueryRoute)


app.post("/search", async (req, res) => {
    const { searchWord } = req.body
    const serachResults = productData.filter(product => product.title.split(" ")[0].includes(searchWord))
    res.send({ serachResults })
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const data = req.body
        const product = await ProductModel.findOne({ _id: data.productData._id })
        const amount = product.price * data.quantity
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        })
        res.send({
            client_secret: paymentIntent.client_secret
        })
    } catch (error) {
        console.log(error)
    }
})


// app.get("/my-orders", (req, res) => {
//     res.send({ productData })
// })


// visitor count
app.set('trust proxy', true)

app.get("/", async (req, res) => {

    const data = await ProductModel.find({})
    res.send({
        message: "Server is running Properly!",
        data: data
    })
})

app.listen(5000)