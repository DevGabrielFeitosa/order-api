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

exports.getOrderById = async (req, res) => {

    try {

        const order = await orderService.getOrderById(req.params.orderId);

        res.status(200).json(order);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }
};