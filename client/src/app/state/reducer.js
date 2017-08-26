import { combineReducers } from 'redux'
import cartReducer         from '../views/cart/state/reducer'
import shopReducer         from '../views/shop/state/shop-redux'
import userReducer         from '../views/user/state/reducer'
import flashReducer        from '../ui/flash/flash-redux'

export default combineReducers({
  cart:  cartReducer,
  shop:  shopReducer,
  user:  userReducer,
  flash: flashReducer
})
