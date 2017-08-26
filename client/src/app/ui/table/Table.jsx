import React     from 'react'
import PropTypes from 'prop-types'

Table.propTypes = {
  className: PropTypes.string,
  columns:   PropTypes.array.isRequired,
  rows:      PropTypes.object.isRequired
}

export default function Table({columns, rows, className}) {
  const _columns = columns.map((c, idx) => <th className={c.class} key={`tc-${idx}`}>{c.value}</th>)

  const _rows = rows.map((r, rIdx) => {
    const row = r.map((c, cIdx) => {
      const key   = `rc-${rIdx}-${cIdx}`
      const value = c.component || c.value
      return <td key={key}>{c.delete}{value}</td>
    })

    return <tr key={`tr-${rIdx}`}>{row}</tr>
  })


  return (
    <div className={className}>
      <table>
        <thead>
          <tr>{_columns}</tr>
        </thead>
        <tbody>{_rows}</tbody>
      </table>
    </div>
  )
}
