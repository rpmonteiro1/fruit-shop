import expect          from 'expect'
import { shallowComp } from '../../../utils/test-helpers'
import { ProductRow }  from '../components/ProductRow'
import Immutable       from 'immutable'


describe('ProductRow', () => {

  it('should render a row', () => {
    const props = {
      product: Immutable.fromJS({
        price:       10,
        discount:    15,
        title:       'A fruit',
        description: 'A nice juicy fruit. Makes you fat though.',
        images:      []
      })
    }

    const { output } = shallowComp(ProductRow, props)

    expect(output.find('Slider').length).toEqual(1)
    expect(output.find('.description').length).toEqual(1)
    expect(output.find('Line').length).toEqual(1)
    expect(output.find('.discount-info').length).toEqual(1)
  })

})
