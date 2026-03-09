const express = require('express');

const orderRoutes = require("./routes/orderRoutes.js")
const authRoutes = require("./routes/authRoutes");

const app = express()

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/order", orderRoutes)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})