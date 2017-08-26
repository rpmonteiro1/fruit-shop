import React        from 'react'
import PropTypes    from 'prop-types'
import settings     from '../../../config/settings'
import Line         from '../../../ui/line/Line'
import AddToCartHOC from '../../cart/components/AddToCartHOC'

const currency  = settings.currency


ProductRow.propTypes = {
  product: PropTypes.object.isRequired
}


export function ProductRow({product}) {
  const pPrice    = parseFloat(product.get('price'))
  const pDiscount = parseFloat(product.get('discount'))
  const pTitle    = product.get('title')

  let discount, discountInfo, priceClass = 'price'
  if (pDiscount) {
    const newPrice = (pPrice - pPrice * (pDiscount / 100)).toFixed(2)
    discount       = <div className="discounted-price">{currency} {newPrice}</div>
    discountInfo   = <div className="discount-info">{`${pDiscount}% off`}</div>
    priceClass     += ' strikethrough'
  }

  const title       = <h3 className="title">{pTitle}</h3>
  const description = <div className="description">{product.get('description')}</div>
  const price       = <div className={priceClass}>{currency} {pPrice}</div>
  const sweetness = (
    <div className="sweetness">
      <span>Sweetness: </span>
      <Line percentage={product.get('sweetness')} />
    </div>
  )

  let promotion
  if (product.get('3for2')) {
    promotion = <div className="special-offer">Special offer: 3 for 2</div>
  }

  return (
    <div className="product-row">
      <div className="slider">
        <img src={product.getIn(['images', 0])} alt={pTitle} />
      </div>
      <div className="details">
        {title}
        {description}
        {sweetness}
        {price}
        {discount}
        {discountInfo}
        {promotion}
      </div>
    </div>
  )
}

export default AddToCartHOC(ProductRow)
