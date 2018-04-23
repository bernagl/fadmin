import { GET_MODEL, GET_MODELS } from '../types'

const INITIAL_STATE = {
  data: [],
  selected: {},
  selectedTitle: ''
}

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case GET_MODEL:
      return { ...state, selected: payload.data, selectedTitle: payload.model }
    case GET_MODELS:
      return { ...state, data: payload }
    default:
      return state
  }
}
