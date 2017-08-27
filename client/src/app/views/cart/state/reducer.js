import { fromJS } from 'immutable'
import {
  UPDATE_CART,
  TOTALS_REQUEST,
  TOTALS_SUCCESS,
  TOTALS_FAILURE,
  DELETE_CART_ITEM
} from './actions'

const initialState = fromJS({
  error:  '',
  status: '',
  items:  {},
  totals: {}
})


export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case UPDATE_CART: {
      const { id, value } = action.data
      return state.setIn(['items', id.toString()], value)
    }

    case TOTALS_REQUEST:
      return state.set('status', 'requesting totals')

    case TOTALS_SUCCESS:
      return state.withMutations(newState => {
        newState.set('status', '')
        newState.set('error', '')
        newState.set('totals', fromJS(action.data))
      })

    case TOTALS_FAILURE:
      return state.set('error', action.data)


    case DELETE_CART_ITEM:
      return state.deleteIn(['items', action.data.toString()])

    default:
      return state

  }
}
