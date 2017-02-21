import fetch from 'isomorphic-fetch'
import filter from 'lodash/filter'

export const INVALIDATE_FILE = 'INVALIDATE_FILE'
export const SELECT_FILE = 'SELECT_FILE'
export const SELECT_MAKE = 'SELECT_MAKE'
export const RECEIVE_API = 'RECEIVE_API'
export const REQUEST_API = 'REQUEST_API'

export function selectFile(file) {
  return {
    type: SELECT_FILE,
    file
  }
}

export function selectMake(makeId) {
  return {
    type: SELECT_MAKE,
    makeId
  }
}

export function invalidateAPI(file) {
  return {
    type: INVALIDATE_FILE,
    file
  }
}

function requestAPI(file) {
  return {
    type: REQUEST_API,
    file
  }
}

function receiveAPI(file, json) {
  return {
    type: RECEIVE_API,
    file,
    contents: json,
    receivedAt: Date.now()
  }
}

function fetchAPI(file) {
  return dispatch => {
    dispatch(requestAPI(file))
    return fetch('http://localhost:3000/data/' + file)
      .then(response => response.json())
      .then(json => dispatch(receiveAPI(file, json)))
  }
}

function fetchModelsByMakeId(file, makeId = null) {
  return dispatch => {
    dispatch(requestAPI(file))
    return fetch('http://localhost:3000/data/' + file)
      .then(response => response.json())
      .then((json) => {      
        dispatch(receiveAPI(file, filter(json, {'makeId': makeId})))
      })
  }
}

function fetchModelByModelId(file, modelId = null) {
  return dispatch => {
    dispatch(requestAPI(file))
    return fetch('http://localhost:3000/data/' + file)
      .then(response => response.json())
      .then((json) => {      
        dispatch(receiveAPI(file, filter(json, {'id': modelId})))
      })
  }
}

function shouldFetchAPI(state, file, filter = null) {
  const contents = state.contentsFromAPI[file]

  if (!contents || filter) {
    return true
  } else if (contents.isFetching) {
    return false
  } else {
    return contents.didInvalidate
  }
}

export function fetchContentsIfNeeded(file) {
  return (dispatch, getState) => {
    if (shouldFetchAPI(getState(), file)) {
      return dispatch(fetchAPI(file))
    }
  }
}

export function fetchContentsWithFilter(file, makeId) {
  return (dispatch, getState) => {
    if (shouldFetchAPI(getState(), file, makeId)) {
      return dispatch(fetchModelsByMakeId(file, makeId))
    }
  }
}

export function getModelByModelId(file, modelId) {
  return (dispatch, getState) => {
    if (shouldFetchAPI(getState(), file, modelId)) {
      return dispatch(fetchModelByModelId(file, modelId))
    }
  }
}

export function getCarOfTheWeek(file) {
  return (dispatch, getState) => {
    if (shouldFetchAPI(getState(), file)) {
      return dispatch(fetchAPI(file))
    }
  }
}