import {
  CREATE_DOCUMENT,
  DELETE_DOCUMENT,
  GET_DOCUMENT,
  GET_COLLECTION,
  UPDATE_DOCUMENT
} from '../types'

export default (state = [], { payload, type }) => {
  switch (type) {
    case GET_COLLECTION:
      return payload
    case CREATE_DOCUMENT:
      return [...state, payload]
    case DELETE_DOCUMENT:
      return state.filter(doc => doc.key !== payload)
    case UPDATE_DOCUMENT:
      return state.map(doc => (doc.key === payload.key ? payload : doc))
    default:
      return state
  }
}
