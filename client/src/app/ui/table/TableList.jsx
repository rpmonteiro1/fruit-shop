/* Dev comments:
  Didn't feel right to hardcode values and columns for the fruit shop.
  Instead, this component dinamically generates everything based on the columns/row data passed.
  This way, any cell can have any component rendered in it, with the parent handling all onChanges.

  So far, I only had the need to include either an image or input component in the cells, but can easily be expanded to just about anything with minimal effort.
*/

import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'
import Table                    from './Table'


export default class TableList extends PureComponent {

  static propTypes = {
    className:     PropTypes.string,
    dispatch:      PropTypes.func,
    deleteHandler: PropTypes.func,
    cellHandler:   PropTypes.func,
    rowData:       PropTypes.array.isRequired,
    items:         PropTypes.object.isRequired,
    columns:       PropTypes.array.isRequired
  }


  cellHandler = e => {
    const v = e.target.value
    const { idx, id, k } = e.target.dataset
    this.props.cellHandler({idx, k, v, id})
  }


  input = ({id, k, v, idx, d}) => {
    return (
      <input
        {...d}
        data-id={id}
        data-idx={idx}
        data-k={k}
        value={v}
        onChange={this.cellHandler}
      />
    )
  }


  renderDeleteIcon(id, idx) {
    return (
      <i className="icon delete-icon"
        data-id={id}
        data-idx={idx}
        onClick={this.props.deleteHandler}>
        delete
      </i>
    )
  }


  makeRow = (id, idx) => {
    const { rowData, items } = this.props

    const getValue   = k => items.getIn([idx, k])
    const components = {
      input: (k, v, d) => this.input({id, k, v, d, idx}),
      image: (k, v)    => <img src={v} alt={k}></img>
    }

    const data = rowData.map((d, idx) => {
      const row     = {}
      const value   = getValue(d.key)
      const data    = d.data
      const isFirst = idx === 0

      if (isFirst) {
        row.delete = this.renderDeleteIcon(id, idx)
      }

      d.component
        ? row.component = components[d.component](d.key, value, data)
        : row.value     = value

      return row
    })

    return data
  }


  render() {
    const { items, columns, className } = this.props
    const rows = items.map((i, idx) => this.makeRow(i.get('id'), idx))

    return (
      <Table className={className} rows={rows} columns={columns} />
    )
  }

}
