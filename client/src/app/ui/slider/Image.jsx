import React, { PureComponent } from 'react'
import PropTypes                from 'prop-types'


export default class Image extends PureComponent {

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  state = {
    loading: true,
    error:   false
  }


  componentWillReceiveProps() {
    this.setState({loading: true})
  }


  loaded = () => {
    this.setState({loading: false, error: false})
  }


  loadError = () => {
    this.setState({error: true})
  }


  render() {
    const { url } = this.props
    const { loading, error } = this.state

    let spinner
    if (loading) {
      spinner = <div className="loading"></div>
    }

    let errorMsg
    if (error) {
      errorMsg = <div className="error-msg">Could not load image</div>
    }

    return (
      <div>
        <img alt="" src={url} onLoad={this.loaded} onError={this.loadError} />
        {spinner}
        {errorMsg}
      </div>
    )
  }

}
