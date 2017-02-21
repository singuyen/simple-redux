import React, { Component, PropTypes } from 'react'
import { getModelByModelId } from '../actions/actions-api'
import { connect } from 'react-redux'

class ModelApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getModelByModelId('models.json', parseInt(this.props.params.id)))
  }
  
  render() {
    if (this.props.models.items.length === 0) {
      return null
    }
    const model = this.props.models.items[0]
    return (
        <section>
          <h3>{model.name}</h3>
          <img src={model.imageUrl} />
          <p>{model.price}</p>
        </section>
      )
  }
}

ModelApp.propTypes = {
  models: PropTypes.object
}

function mapStateToProps(state) {
  const { contentsFromAPI } = state
  const models = contentsFromAPI['models.json'] || {
    isFetching: true,
    items: []
  }
        
  return {
    models
  }
}

export default connect(mapStateToProps)(ModelApp)