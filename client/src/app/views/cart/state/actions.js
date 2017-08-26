import { action, thunk } from '../../../utils/redux-helpers'

export const UPDATE_CART      = 'UPDATE_CART'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
export const TOTALS_REQUEST   = 'TOTALS_REQUEST'
export const TOTALS_SUCCESS   = 'TOTALS_SUCCESS'
export const TOTALS_FAILURE   = 'TOTALS_FAILURE'

export const updateCart     = (id, v) => action(UPDATE_CART, {id: parseInt(id), value: v})
export const deleteCartItem = id      => action(DELETE_CART_ITEM, parseInt(id))
export const totalsRequest  = ()      => action(TOTALS_REQUEST)
export const totalsSuccess  = data    => action(TOTALS_SUCCESS, data)
export const totalsFailure  = err     => action(TOTALS_FAILURE, err)

export const getTotals = items => thunk({
  endpoint:  'totals',
  method:    'post',
  body:      items.toJS(),
  onReq:     totalsRequest,
  onErr:     totalsFailure,
  onSuccess: totalsSuccess
})
