/* Dev comments:
  Standard smart/dumb component pattern.
*/

import React, { Component } from 'react'
import { connect }          from 'react-redux'
import PropTypes            from 'prop-types'
import ProductsList         from './components/ProductsList'
import Helmet               from 'react-helmet'
import { getProducts }      from './state/shop-redux'


export class Shop extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired
  }


  componentWillMount() {
    this.props.dispatch(getProducts())
  }

  render() {
    const { products } = this.props

    if (!products.size) {
      return null
    }

    return (
      <section className="shop">
        <Helmet title="Shop" />
        <h2>Fruits in stock</h2>
        <ProductsList products={products} />
      </section>
    )
  }

}


const mapStateToProps = state => {
  return {
    products: state.shop.get('products')
  }
}

export default connect(mapStateToProps)(Shop)
