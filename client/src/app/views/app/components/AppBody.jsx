import React      from 'react'
import Flash      from '../../../ui/flash/Flash'
import Menu       from './Menu'
import Shop       from '../../shop/Shop'
import Cart       from '../../cart/Cart'
import Transition from 'react-transition-group/CSSTransitionGroup'


import {
  withRouter,
  Redirect,
  Route
} from 'react-router-dom'


export function AppBody() {
  const transitionTimeout = 1000

  return (
    <Transition
      component="div"
      transitionName="fade"
      transitionAppear={true}
      transitionAppearTimeout={transitionTimeout}
      transitionEnterTimeout={transitionTimeout}
      transitionLeaveTimeout={transitionTimeout}
    >
      <div className="app">
        <Flash />
        <Header />
        <div className="app-body">
          <Menu />
          <Route exact path="/" render={() => <Redirect to="/shop"/>}/>
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/cart" component={Cart} />
        </div>
      </div>
    </Transition>
  )
}

export default withRouter(AppBody)


function Header() {
  return (
    <div className="app-header">
      {'Ric\'s fruit shop'}
    </div>
  )
}
