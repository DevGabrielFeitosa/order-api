const orderService = require("../services/orderService")

exports.createOrder = async (req, res) => {

    try {

        const order = await orderService.createOrder(req.body)

        res.status(201).json(order)

    } catch (error) {

        res.status(500).json({
            message: "Erro ao criar pedido",
            error: error.message
        })

    }

}