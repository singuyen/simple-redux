import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { getCarOfTheWeek } from '../actions/actions-api'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCarOfTheWeek('carOfTheWeek.json'))
  }
  
  renderCarOfTheWeek() {
    const car = this.props.cars.items
        
    return (
      <div>
        <p>{car.modelId}</p>
        <p>{car.review}</p>
      </div>
    )
  }
  
  render() {
    if (this.props.cars.items.length === 0) {
      return null
    }
        
    return (
      <div>
        <Header />
        {this.props.children === null ? this.renderCarOfTheWeek() : this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  cars: PropTypes.object
}

function mapStateToProps(state) {
  const { contentsFromAPI } = state
  const cars = contentsFromAPI['carOfTheWeek.json'] || {
    isFetching: true,
    items: []
  }
  
  return {
    cars
  }
}

export default connect(
  mapStateToProps
)(App)
