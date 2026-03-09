const HttpError = require("../errors/HttpError");const orderRepository = require("../repositories/orderRepository");

// Valida os dados recebidos do pedido.
function validatePayload(payload) {
    const errors = [];

    if (!payload.numeroPedido || typeof payload.numeroPedido !== 'string') {
        errors.push("numeroPedido é obrigatório e deve ser uma string");
    }

    if (payload.valorTotal === undefined || typeof payload.valorTotal !== 'number' || payload.valorTotal <= 0) {
        errors.push("valorTotal é obrigatório e deve ser um número positivo");
    }

    if (!payload.dataCriacao) {
        errors.push("dataCriacao é obrigatória");
    } else {
        const date = new Date(payload.dataCriacao);
        if (isNaN(date.getTime())) {
            errors.push("dataCriacao deve ser uma data válida");
        }
    }

    if (!Array.isArray(payload.items) || payload.items.length === 0) {
        errors.push("items é obrigatório e deve conter pelo menos um item");
    }else {
        const seenIds = new Set();
        payload.items.forEach((item, index) => {
            if (!item.idItem || typeof item.idItem !== 'string') {
                errors.push(`items[${index}].idItem é obrigatório e deve ser uma string`);
            } else {
                const productId = Number(item.idItem);
                if (isNaN(productId) || productId <= 0) {
                    errors.push(`items[${index}].idItem deve ser um número positivo válido`);
                }
                // verificar duplicidade
                if (seenIds.has(item.idItem)) {
                    errors.push(`items[${index}].idItem duplicado: ${item.idItem} já foi informado em outro item`);
                } else {
                    seenIds.add(item.idItem);
                }
            }

            if (item.quantidadeItem === undefined || typeof item.quantidadeItem !== 'number' || !Number.isInteger(item.quantidadeItem) || item.quantidadeItem <= 0) {
                errors.push(`items[${index}].quantidadeItem é obrigatório e deve ser um número inteiro positivo`);
            }

            if (item.valorItem === undefined || typeof item.valorItem !== 'number' || item.valorItem <= 0) {
                errors.push(`items[${index}].valorItem é obrigatório e deve ser um número positivo`);
            }
        });
    }

    if (errors.length > 0) {
        throw new HttpError(400, `Erros de validação: ${errors.join('; ')}`);
    }
}

// Converte o payload da API para o formato do pedido.
function mapRequestToOrder(payload) {
    return {
        orderId: payload.numeroPedido,
        value: payload.valorTotal,
        creationDate: payload.dataCriacao,
        items: payload.items.map(item => ({
            productId: Number(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
}

// Valida e cria um novo pedido.
exports.createOrder = async (payload) => {
    validatePayload(payload);

    const existing = await orderRepository.findOrderById(payload.numeroPedido);
    if (existing) {
        throw new HttpError(409, "Este pedido já está aguardando na fila de processamento");
    }

    const order = mapRequestToOrder(payload);
    return await orderRepository.saveOrder(order);
};

// Busca um pedido com seus itens.
exports.getOrderById = async (orderId) => {

    const order = await orderRepository.findOrderWithItems(orderId);

    if (!order) {
        throw new HttpError(404, "Pedido não encontrado");
    }

    return order;
};

// Retorna todos os pedidos cadastrados.
exports.getAllOrders = async () => {

    const orders = await orderRepository.findAllOrders();

    if (!orders) {
        throw new HttpError(404, "Nenhum pedido encontrado");
    }

    return orders;
};

// Exclui um pedido existente.
exports.deleteOrder = async (orderId) => {

    const deleted = await orderRepository.deleteOrder(orderId)

    if (deleted === 0) {
        throw new HttpError(404, "Pedido não encontrado")
    }

}

// Valida e atualiza um pedido existente.
exports.updateOrder = async (orderId, payload) => {

    const existing = await orderRepository.findOrderById(orderId);

    if (!existing) {
        throw new HttpError(404, "Pedido não encontrado");
    }

    validatePayload(payload);

    const order = {
        orderId: orderId,
        value: payload.valorTotal,
        creationDate: payload.dataCriacao,
        items: payload.items.map(item => ({
            productId: Number(item.idItem),
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };

    return await orderRepository.updateOrder(order);
};