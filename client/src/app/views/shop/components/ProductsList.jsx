import React      from 'react'
import PropTypes  from 'prop-types'
import ProductRow from './ProductRow'


ProductsList.propTypes = {
  products: PropTypes.object.isRequired
}

export default function ProductsList({products}) {
  const productRows = products.map((p, idx) => {
    return <ProductRow key={`p-${idx}`} id={p.get('id')} product={p} />
  })

  return (
    <div className="products-list">
      {productRows}
    </div>
  )
}
