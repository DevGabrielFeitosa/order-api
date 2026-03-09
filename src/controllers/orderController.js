const orderService = require("../services/orderService")

exports.createOrder = async (req, res) => {

    try {

        const order = await orderService.createOrder(req.body)

        res.status(201).json(order)

    } catch (error) {

        const status = error.statusCode || 500

        res.status(status).json({
            message: error.message || "Erro interno"
        })

    }

}