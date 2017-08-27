/* Dev comments:
  Tiny helpers I usually put in my projects to accelerate the speed with which I can write tests.
*/

import React              from 'react'
import { shallow, mount } from 'enzyme'

export function shallowComp(comp, opts = {}, context = {}) {
  const props = Object.assign({}, opts)
  const el = React.createElement(comp, props)
  const output = shallow(el, context)
  return { props, output }
}

export function mountComp(comp, opts = {}, context = {}) {
  const props = Object.assign({}, opts)
  const el = React.createElement(comp, props)
  const output = mount(el, context)
  return { props, output }
}
