

import expect          from 'expect'
import reducer         from '../state/reducer'
import * as actions    from '../state/actions'
import { Map, fromJS } from 'immutable'


describe('cart reducer', () => {

  it('should return the initial state', () => {
    const initialState = reducer()
    expect(initialState.get('items')).toEqual(Map())
  })


  it('should delete a cart item', () => {
    const action = actions.deleteCartItem(3)
    const mockState = fromJS({
      items: {
        3: 10
      }
    })

    const state = reducer(mockState, action)
    expect(state.get('items')).toEqual(Map())
  })


  it('should update the cart count', () => {
    const action = actions.updateCart(3, 11)
    const mockState = fromJS({
      items: {
        3: 10
      }
    })

    const state = reducer(mockState, action)
    expect(state.get('items')).toEqual(Map({3: 11}))
  })
})
