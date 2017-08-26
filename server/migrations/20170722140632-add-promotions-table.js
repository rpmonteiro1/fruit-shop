'use strict'

exports.up = function (db) {
  return db.createTable('promotions', {
    id:            { type: 'int', primaryKey:       true, autoIncrement: true },
    product_id:    { type: 'int', notNull:          true },
    three_for_two: { type: 'boolean', defaultValue: false },
    discount:      { type: 'int' }
  })
    .then(() => {
      return db.runSql(
        `
        INSERT INTO promotions (product_id, three_for_two, discount)
         VALUES (
           4,
           true,
           null
         ),
         (
           2,
           false,
           15
         );
        `
      )
    })
}

exports.down = function (db) {
  return db.dropTable('promotions')
}
