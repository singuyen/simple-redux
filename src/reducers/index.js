import { combineReducers } from 'redux'
import todos from './todos'
import cars from './cars'
import { contentsFromAPI, selectedFile } from './api'
import { postsBySubreddit, selectedSubreddit } from './reddit'

const rootReducer = combineReducers({
  todos,
  cars,
  postsBySubreddit,
  selectedSubreddit,
  selectedFile,
  contentsFromAPI
})

export default rootReducer
