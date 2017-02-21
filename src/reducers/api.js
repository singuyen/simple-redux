import {
  INVALIDATE_FILE, 
  REQUEST_API, 
  RECEIVE_API, 
  SELECT_FILE, 
  SELECT_MAKE
} from '../actions/actions-api'

export function selectedFile(state = 'makes.json', action) {
  switch (action.type) {
    case SELECT_FILE:
      return action.file
    default:
      return state
  }
}

export function selectedMake(state = 'models.json', action) {
  switch (action.type) {
    case SELECT_MAKE:
      return action.makeId
    default:
      return state
  }
}

function contents(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_FILE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_API:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_API:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.contents,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function contentsFromAPI(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_FILE:
    case RECEIVE_API:
    case REQUEST_API:
      return Object.assign({}, state, {
        [action.file]: contents(state[action.file], action)
      })
    default:
      return state
  }
}
