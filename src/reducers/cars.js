// import { REQUEST_CONTENT, RECEIVE_CONTENT } from './actions'
// 
// function contents(state = {
//   isFetching: false,
//   items: []
// }, action) {
//   switch (action.type) {
//     case REQUEST_CONTENT:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_CONTENT:
//       return Object.assign({}, state, {
//         isFetching: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }
// 
// function contentsByLocalFetching(state = {}, action) {
//   switch (action.type) {
//     case RECEIVE_CONTENT:
//     case REQUEST_CONTENT:
//       return Object.assign({}, state, {
//         [action.data]: contents(state[action.data], action)
//       })
//     default:
//       return state
//   }
// }
// 

export default function cars(state = [], action) {
    switch (action.type) {        
      default:
        return []
    }
}
