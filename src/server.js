const express = require('express');

const orderRoutes = require("./routes/orderRoutes.js")

const app = express()

app.use(express.json())

app.use("/order", orderRoutes)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})