import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import HomeComponent from '../components/Home'
import * as TodoActions from '../actions'

const Home = ({todos, actions, data}) => (
  <div>
    <Header addTodo={actions.addTodo} />
    <HomeComponent />
  </div>
)

Home.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  data: PropTypes.array
}

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
