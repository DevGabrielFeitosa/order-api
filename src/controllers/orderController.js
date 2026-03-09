const orderService = require("../services/orderService")

// Cria um novo pedido.
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

// Busca um pedido pelo identificador.
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

// Lista todos os pedidos.
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

// Remove um pedido pelo identificador.
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

// Atualiza os dados de um pedido.
exports.updateOrder = async (req, res) => {

    try {

        const order = await orderService.updateOrder(
            req.params.orderId,
            req.body
        );

        res.status(200).json(order);

    } catch (error) {

        res.status(error.statusCode || 500).json({
            message: error.message
        });

    }

};