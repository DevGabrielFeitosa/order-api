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

exports.listOrders = async (req, res) => {

    try {

        const orders = await orderService.getAllOrders()

        res.status(200).json(orders)

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message || "Erro interno"
        })

    }

}

exports.deleteOrder = async (req, res) => {

    try {

        await orderService.deleteOrder(req.params.orderId)

        res.status(204).send()

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
        })

    }

}