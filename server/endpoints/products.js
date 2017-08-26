'use strict'


const products = async function (ctx) {
  const products = await getProducts(ctx.db)
  ctx.body = products
}


function getProducts(db, productIds) {
  let where = ''
  if (productIds) {
    where = `WHERE product.id IN (${productIds})`
  }

  const sql = `
    SELECT product.*,
           promotion.discount,
           promotion.three_for_two AS "3for2"
      FROM products product
 LEFT JOIN promotions promotion
        ON promotion.product_id = product.id
           ${where}
  `

  return db.run(sql)
}


module.exports = { products, getProducts }
