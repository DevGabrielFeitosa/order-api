exports.up = (pgm) => {
  pgm.addColumn('orders', {
    id: {
      type: 'serial',      // autoincremento
      notNull: true,
      unique: true,        // garante unicidade, mas não é chave primária
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('orders', 'id');
};