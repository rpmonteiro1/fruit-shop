'use strict'

const getProducts = require('./products').getProducts

const round = val => parseFloat((Math.round(val * 100) / 100).toFixed(2))

const totals = async function (ctx) {
  const cart = ctx.request.body

  if (!cart) {
    ctx.status = 400
    ctx.response.message = 'Invalid cart data'
    return
  }

  const productIds = Object.keys(cart).join(',')
  const products   = await getProducts(ctx.db, productIds)

  let orderTotal = 0, savingsTotal = 0
  const items = {}

  products.map(p => {
    const id          = p.id
    let qty           = parseInt(cart[id])
    const price       = parseFloat(p.price)
    const discount    = parseFloat(p.discount)
    const fullPrice   = round(price * qty)
    const threeForTwo = p['3for2']

    let total = fullPrice, savings = 0
    if (discount || threeForTwo) {
      qty     = threeForTwo ? (Math.floor(qty / 3) * 2) + (qty % 3) : qty
      total   = round((discount ? (price - price * discount / 100) :  price) * qty)
      savings = round(fullPrice - total)
    }

    savingsTotal += savings
    orderTotal   += total
    items[id]     = { total, savings }
  })


  ctx.status = 200
  ctx.body = {
    items,
    order:   round(orderTotal),
    savings: round(savingsTotal)
  }
}


module.exports = { totals }
