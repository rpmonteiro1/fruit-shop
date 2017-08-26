import { action, thunk } from '../../../utils/redux-helpers'
import { fromJS }        from 'immutable'

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'

export const getProductsRequest = ()   => action(GET_PRODUCTS_REQUEST)
export const getProductsFailure = err  => action(GET_PRODUCTS_FAILURE, err)
export const getProductsSuccess = data => action(GET_PRODUCTS_SUCCESS, data)

export const getProducts = () => thunk({
  endpoint:  'products',
  method:    'get',
  onReq:     getProductsRequest,
  onErr:     getProductsFailure,
  onSuccess: getProductsSuccess
})

const initialState = fromJS({
  status:   '',
  error:    '',
  products: []
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_PRODUCTS_REQUEST:
      return state.set('status', 'Requesting products')

    case GET_PRODUCTS_SUCCESS:
      return state.withMutations(newState => {
        newState.set('status', '')
        newState.set('products', fromJS(action.data))
      })

    case GET_PRODUCTS_FAILURE:
      return state.set('error', action.data)

    default:
      return state

  }
}
