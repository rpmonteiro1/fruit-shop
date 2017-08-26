

import expect       from 'expect'
import reducer      from '../state/reducer'
import * as actions from '../state/actions'
import { List }     from 'immutable'


describe('cart reducer', () => {
  it('should return the initial state', () => {
    const initialState = reducer()
    expect(initialState.get('items')).toEqual(List())
  })
})
