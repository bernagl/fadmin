import { GET_MODEL } from '../types'

export default (state = [], { payload, type }) => {
  switch (type) {
    case GET_MODEL:
      return payload
    default:
      return state
  }
}
