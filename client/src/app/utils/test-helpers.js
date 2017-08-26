

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
