/* Dev comments:
  My idea for this HOC is that sometimes in an e-commerce shop you might want to allow the users to add items to a cart from varied places eg. a Modal window, or a special promotion popup. With this HOC, you can simply wrap any items that can be added into the cart, and it automagically takes care of the implementation for that. The only thing it needs is a valid ID. If the fruit store was to be developed further, this would probably be an important piece of the app.
*/

import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import { updateCart }           from '../state/actions'


export default function AddToCartHOC(Product) {
  class CartWidget extends PureComponent {

    static propTypes = {
      id:       PropTypes.number.isRequired,
      items:    PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired
    }


    state = {
      active: false,
      count:  0
    }


    componentWillMount() {
      this.populateState()
    }


    componentWillReceiveProps(nextProps) {
      if (this.props.items !== nextProps.items) {
        this.populateState(nextProps)
      }
    }


    populateState = (props = this.props) => {
      const { id, items } = props
      const count = items.get(`${id}`)

      this.setState({
        active: count > 0 ? true : false,
        count:  count || 0
      })
    }


    updateCart = e => {
      const { count }        = this.state
      const { id, dispatch } = this.props

      const { add } = e.target.dataset
      const value   = add ? count + 1 : count - 1

      dispatch(updateCart(id, value))
    }


    cartBtn = (text, add) => {
      return (
        <button
          data-add={add}
          onClick={this.updateCart}
          className="btn btn-primary">
          {text}
        </button>
      )
    }


    render() {
      const { active, count } = this.state

      const addBtn = this.cartBtn('Add', true)
      const btnRow = (
        <div className="cart-qty-row">
          {this.cartBtn('-')}
          <span className="cart-item-count">{count}</span>
          {this.cartBtn('+', true)}
        </div>
      )

      const basketInfo = (
        <div className="cart-info">
          <i className="icon md-16">shopping_basket</i>
          <span>{count} in basket</span>
        </div>
      )

      const widget = (
        <div className="cart-widget">
          {!active && addBtn}
          {active && btnRow}
          {active && basketInfo}
        </div>
      )


      return (
        <div className="shop-row">
          <Product {...this.props} />
          {widget}
        </div>
      )
    }

  }


  const mapStateToProps = (state) => {
    return {
      items: state.cart.get('items')
    }
  }

  return connect(mapStateToProps)(CartWidget)
}
