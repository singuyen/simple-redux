import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchContentsIfNeeded, fetchContentsWithFilter, selectMake } from '../actions/actions-api'

class SearchApp extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      make: '',
      model: '',
      modelId: 0,
      buttonDisable: true
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContentsIfNeeded('makes.json'))
    dispatch(fetchContentsIfNeeded('models.json'))
  }
  
  handleMakeChange(target) {
    const { dispatch } = this.props
    const makeId = parseInt(target.value)
    const make = target[target.selectedIndex].text
    
    dispatch(selectMake(makeId))    
    dispatch(fetchContentsWithFilter('models.json', makeId))
    this.setState({
      make
    })
  }
  
  handleModelChange(target) {
    const modelId = parseInt(target.value)
    const model = target[target.selectedIndex].text
    
    this.setState({
      buttonDisable: false,
      model,
      modelId
    })
  }
  
  handleSubmission() {
    window.location = `#/make/model/${this.state.modelId}`
  }
  
  renderMakeSelector() {
    return this.props.makes.items.map((item) => {
      return (
        <option key={item.id} value={item.id}>{item.name}</option>
      )
    })
  }

  renderModelSelector() {
    return this.props.models.items.map((item) => {
      return (
        <option key={item.id} value={item.id}>{item.name}</option>
      )
    })
  }
  
  render() {
    return (
      <form>
        <fieldset>
          <select onChange={e => this.handleMakeChange(e.target)}>
            <option>Select Make</option>
            {this.renderMakeSelector()}
          </select>
        </fieldset>
        <fieldset>
          <select onChange={e => this.handleModelChange(e.target)}>
            <option>Select Model</option>
            {this.renderModelSelector()}
          </select>
        </fieldset>
        <fieldset>
          <input type="button" onClick={() => {this.handleSubmission()}} name="GO" value="GO" disabled={this.state.buttonDisable}/>
        </fieldset>
      </form>
      )
  }
}

SearchApp.propTypes = {
  makes: PropTypes.object,
  models: PropTypes.object,
  seletedFile: PropTypes.string,
  selectedMake: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedFile, contentsFromAPI, selectedMake } = state
  const makes = contentsFromAPI['makes.json'] || {
    isFetching: true,
    items: []
  }
  const models = contentsFromAPI['models.json'] || {
    isFetching: true,
    items: []
  }
        
  return {
    selectedFile,
    selectedMake,
    makes,
    models
  }
}

export default connect(mapStateToProps)(SearchApp)