import PropTypes                from 'prop-types'
import React, { PureComponent } from 'react'
import { connect }              from 'react-redux'
import { resetFlash }           from './flash-redux'

const flashDuration = 4 * 1000


export class Flash extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message:  PropTypes.string,
    type:     PropTypes.string
  }

  _timeout = 0

  hideFlash = () => {
    window.clearTimeout(this._timeout)
    this.props.dispatch(resetFlash())
  }

  render() {
    const { message, type } = this.props

    let className = `flash flash-${type}`
    if (message) {
      className += ' active'
      window.clearTimeout(this._timeout)
      this._timeout = window.setTimeout(this.hideFlash, flashDuration)
    }

    return (
      <div className={className} onClick={this.hideFlash}>
        <div>{message}</div>
        <i className="icon flash-close-icon">close</i>
      </div>
    )
  }

}


const mapStateToProps = state => {
  return {
    message: state.flash.get('message'),
    type:    state.flash.get('type')
  }
}

export default connect(mapStateToProps)(Flash)
