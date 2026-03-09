const pool = require("../database/connnection")

// Salva o pedido e os itens no banco.
exports.saveOrder = async (order) => {

    const client = await pool.connect()

    try {

        await client.query("BEGIN")

        await client.query(
            `INSERT INTO orders ("orderId", value, "creationDate") VALUES ($1,$2,$3)`,
            [order.orderId, order.value, order.creationDate]
        );

        for (const item of order.items) {

            await client.query(
                `INSERT INTO items("orderId", "productId", quantity, price)
                 VALUES ($1,$2,$3,$4)`,
                [
                    order.orderId,
                    item.productId,
                    item.quantity,
                    item.price
                ]
            )

        }

        await client.query("COMMIT")

        return order

    } catch (error) {

        await client.query("ROLLBACK")
        throw error

    } finally {

        client.release()

    }

}

// Busca um pedido pelo identificador.
exports.findOrderById = async (orderId) => {
    const result = await pool.query('SELECT * FROM orders WHERE "orderId" = $1', [orderId]);
    return result.rows[0];
};

// Busca um pedido com a lista de itens.
exports.findOrderWithItems = async (orderId) => {

    const orderResult = await pool.query(
        `SELECT * FROM orders WHERE "orderId" = $1`,
        [orderId]
    );

    if (orderResult.rows.length === 0) {
        return null;
    }

    const itemsResult = await pool.query(
        `SELECT * FROM items WHERE "orderId" = $1`,
        [orderId]
    );

    return {
        ...orderResult.rows[0],
        items: itemsResult.rows
    };
};

// Lista os pedidos por data de criação.
exports.findAllOrders = async () => {

    const result = await pool.query(`SELECT * FROM orders ORDER BY "creationDate" DESC`)

    return result.rows
}

// Remove um pedido e seus itens.
exports.deleteOrder = async (orderId) => {

    const client = await pool.connect()

    try {

        await client.query("BEGIN")

        await client.query(
            `DELETE FROM items WHERE "orderId" = $1`,
            [orderId]
        )

        const result = await client.query(
            `DELETE FROM orders WHERE "orderId" = $1`,
            [orderId]
        )

        await client.query("COMMIT")

        return result.rowCount

    } catch (error) {

        await client.query("ROLLBACK")
        throw error

    } finally {

        client.release()

    }
}

// Atualiza o pedido e grava os itens novamente.
exports.updateOrder = async (order) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        await client.query(
            `UPDATE orders
             SET value = $1,
                 "creationDate" = $2
             WHERE "orderId" = $3`,
            [
                order.value,
                order.creationDate,
                order.orderId
            ]
        );

        // remove itens antigos
        await client.query(
            `DELETE FROM items WHERE "orderId" = $1`,
            [order.orderId]
        );

        // insere itens novos
        for (const item of order.items) {

            await client.query(
                `INSERT INTO items ("orderId", "productId", quantity, price)
                 VALUES ($1,$2,$3,$4)`,
                [
                    order.orderId,
                    item.productId,
                    item.quantity,
                    item.price
                ]
            );

        }

        await client.query("COMMIT");

        return order;

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
};