



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
const { allUsersRoute } = require("./routes/allUsers.route")
const { fetchAllProductRoute } = require("./routes/fetchAllProduct.route")
const { fetchProductRoute } = require("./routes/fetchProduct.route")
const { fetchOrderRoute } = require("./routes/fetchOrder.route")
const { updateOrderStatusRoute } = require("./routes/updateOrderStatus.route")
const { ProductModel } = require("./models/Product.model")
const { addProductRoute } = require("./routes/addProduct.route")
app.use('/signup', signupRoute)
app.use('/login', loginRoute)
app.use('/my-orders', getMyOrdersRoute)
app.use('/add-order', addMyOrderRoute)
app.use('/cancel-order', cancelOrderRoute)
app.use('/all-orders', allOrdersRoute)
app.use('/all-users', allUsersRoute)
app.use('/add-product', addProductRoute)
app.use('/fetch-product', fetchProductRoute)
app.use('/all-products', fetchAllProductRoute)
app.use('/fetch-order', fetchOrderRoute)
app.use('/update-order-status', updateOrderStatusRoute)

// const calculateAmount = (data) => {
//     const product = productData.find(product => product.id == data.productData.id)
//     const total = product.price * data.quantity * 100
//     return total
// }


app.post("/search", async (req, res) => {
    const { searchWord } = req.body
    const serachResults = productData.filter(product => product.title.split(" ")[0].includes(searchWord))
    res.send({ serachResults })
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const data = req.body
        const product = await ProductModel.findOne({ _id: data.productData._id })
        const amount = product.price * data.quantity * 100
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

app.get("/", (req, res) => {
    res.send("Server is running Properly!")
})

app.listen(5000)