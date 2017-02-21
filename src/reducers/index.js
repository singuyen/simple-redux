import { combineReducers } from 'redux'
import { contentsFromAPI, selectedFile } from './api'

const rootReducer = combineReducers({
  selectedFile,
  contentsFromAPI
})

export default rootReducer
