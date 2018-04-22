import { GET_MODEL, GET_MODELS } from '../types'

const INITIAL_STATE = {
  data: [],
  selected: {}
}

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case GET_MODEL:
      return { ...state, selected: payload }
    case GET_MODELS:
      return { ...state, data: payload }
    default:
      return state
  }
}
