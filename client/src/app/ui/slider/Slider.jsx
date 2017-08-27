/* Dev comments:
  Next would be to add some fancy animations/transitions between images. All it has it a little loading spinner when loading images.
*/

import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import Image                from './Image'


export default class Slider extends Component {

  static propTypes = {
    images: PropTypes.object.isRequired
  }

  state = {
    index:  0,
    length: 0
  }


  componentWillMount() {
    this.setState({length: this.props.images.size})
  }


  componentWillReceiveProps(nextProps) {
    const newImages = this.props.images.size !== nextProps.images.size
    if (newImages) {
      this.setState({length: nextProps.images.size})
    }
  }


  nextIdx = () => {
    this.setState(({ index, length }) => ({ index: (index + 1) % length }))
  }


  prevIdx = () => {
    this.setState(({ index, length }) => ({ index: (index - 1) % length }))
  }


  render() {
    const { images } = this.props
    const { index }  = this.state

    const image = <Image url={images.get(index)} />

    const prevBtn = (
      <button className="btn btn-primary" onClick={this.prevIdx}>
        <i className="icon">chevron_left</i>
      </button>
    )

    const nextBtn = (
      <button className="btn btn-primary" onClick={this.nextIdx}>
        <i className="icon">chevron_right</i>
      </button>
    )

    return (
      <div className="slider">
        {prevBtn}
        {image}
        {nextBtn}
      </div>
    )
  }

}
