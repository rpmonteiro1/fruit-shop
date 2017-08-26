import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'


export default class Line extends PureComponent {

  static propTypes = {
    percentage: PropTypes.number.isRequired
  }

  state = {
    style: {
      strokeDasharray:  '100px, 100px',
      strokeDashoffset: '100px',
      transition:       'stroke-dashoffset 2s ease 0s, stroke 2s linear'
    }
  }


  componentDidMount() {
    const { style } = this.state
    const newStyle = Object.assign({}, style)

    setTimeout(() => {
      newStyle.strokeDashoffset = `${(100 - this.props.percentage)}px`
      this.setState({style: newStyle})
    }, 50)
  }


  render() {
    const { style } = this.state

    const strokeColor   = '#ff9b53'
    const trailColor    = '#ff5400'
    const trailWidth    = 0.2
    const strokeLinecap = 'round'
    const strokeWidth   = 3
    const center        = strokeWidth / 2
    const right         = 100 - (strokeWidth / 2)
    const pathString    = `M ${center}, ${center} L ${right}, ${center}`
    const viewBoxString = `0 0 100 ${strokeWidth}`

    return (
      <svg
        className="animated-line"
        viewBox={viewBoxString}
        preserveAspectRatio="none"
      >
        <path
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={trailColor}
          strokeWidth={trailWidth || strokeWidth}
          fillOpacity="0"
        />
        <path
          d={pathString}
          strokeLinecap={strokeLinecap}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fillOpacity="0"
          style={style}
        />
      </svg>
    )
  }

}
