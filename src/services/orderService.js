const HttpError = require("../errors/HttpError");const orderRepository = require("../repositories/orderRepository");

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

exports.createOrder = async (payload) => {
    validatePayload(payload);

    const existing = await orderRepository.findOrderById(payload.numeroPedido);
    if (existing) {
        throw new HttpError(409, "Este pedido já está aguardando na fila de processamento");
    }

    const order = mapRequestToOrder(payload);
    return await orderRepository.saveOrder(order);
};