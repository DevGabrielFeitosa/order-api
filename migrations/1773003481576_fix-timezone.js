exports.up = (pgm) => {
  pgm.alterColumn('orders', 'creationDate', {
    type: 'timestamptz', // timestamp with time zone
    using: '("creationDate"::timestamptz)', // converte dados existentes
  });
};

exports.down = (pgm) => {
  pgm.alterColumn('orders', 'creationDate', {
    type: 'timestamp',
    using: '("creationDate"::timestamp)',
  });
};