import { CREATE_MODEL, GET_MODEL, GET_MODELS } from '../types'

const INITIAL_STATE = {
  data: [],
  selected: [],
  selectedTitle: '',
  formatedTitle: ''
}

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case GET_MODEL:
      return {
        ...state,
        selected: payload.data,
        selectedTitle: payload.model,
        formatedTitle: payload.formatedTitle
      }
    case GET_MODELS:
      return { ...state, data: payload }
    case CREATE_MODEL:
      return { ...state, data: [...state.data, payload] }
    default:
      return state
  }
}
