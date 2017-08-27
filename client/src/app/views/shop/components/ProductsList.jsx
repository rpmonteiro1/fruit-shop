/* Dev comments:
  This can be vastly improved. At the moment, it just renders all available items. But what if the store had thousands of products? Or even hundreds...
  2 possible approaches:
  - Create a custom List component, that given the height of each row, calculates the total height of the container, and it only renders the amount of items needed to fill the screen at once. This way, no more than 20/30 items would be rendered at once. Highly performant, even with thousands of items!
  - Lazy load items as we scroll down the page. At some point the list would become very big if the user keeps scrolling for ever, affecting performance. Some optimizations would be required to only keep X amount of items in memory.
*/

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
