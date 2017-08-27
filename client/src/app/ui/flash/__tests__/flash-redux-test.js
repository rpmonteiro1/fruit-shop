'use strict'

import expect from 'expect'
import reducer, {
  flashMessage,
  resetFlash
} from '../flash-redux'

describe('flash actions', () => {
  it('should return the initial state', () => {
    const initialState = reducer()
    expect(initialState.get('message')).toEqual('')
    expect(initialState.get('type')).toEqual('')
  })

  it('should set a default notice flash messsage', () => {
    const action = flashMessage({message: 'A message 1', type: 'success'})
    const state  = reducer(undefined, action)
    expect(state.get('message')).toEqual('A message 1')
    expect(state.get('type')).toEqual('success')
  })

  it('should set a flash message of a specific type', () => {
    const action = flashMessage({message: 'A message 2', type: 'error'})
    const state  = reducer(undefined, action)
    expect(state.get('message')).toEqual('A message 2')
    expect(state.get('type')).toEqual('error')
  })

  it('should reset the flash message', () => {
    let action = flashMessage({message: 'A message 3', type: 'error'})
    let state  = reducer(undefined, action)
    expect(state.get('message')).toEqual('A message 3')
    action = resetFlash()
    state = reducer(state, action)
    expect(state.get('message')).toEqual('')
  })
})
