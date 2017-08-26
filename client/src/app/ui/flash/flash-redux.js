

import { action } from '../../utils/redux-helpers'
import { fromJS } from 'immutable'

const FLASH_MESSAGE = 'FLASH_MESSAGE'
const RESET_FLASH   = 'RESET_FLASH'

export const flashMessage = data => action(FLASH_MESSAGE, data)
export const resetFlash   = ()   => action(RESET_FLASH)


const initialState = fromJS({
  type:    '',
  message: ''
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case FLASH_MESSAGE:
      return state.withMutations(newState => {
        newState.set('message', action.data.message)
        newState.set('type', action.data.type)
      })

    case RESET_FLASH:
      return initialState

    default:
      return state

  }
}
