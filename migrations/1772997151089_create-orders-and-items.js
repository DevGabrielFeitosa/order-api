exports.up = (pgm) => {

  pgm.createTable('orders', {
    orderId: {
      type: 'varchar',
      primaryKey: true
    },
    value: {
      type: 'numeric',
      notNull: true
    },
    creationDate: {
      type: 'timestamp',
      notNull: true
    }
  }, ifNotExists=true);

  pgm.createTable('items', {
    id: 'id',
    orderId: {
      type: 'varchar',
      references: 'orders',
      notNull: true,
      onDelete: 'cascade'
    },
    productId: {
      type: 'integer',
      notNull: true
    },
    quantity: {
      type: 'integer',
      notNull: true
    },
    price: {
      type: 'numeric',
      notNull: true
    }
  }, ifNotExists=true);

};

exports.down = (pgm) => {

  pgm.dropTable('items');
  pgm.dropTable('orders');

};