import { GET_DATA_REQUEST_SUCCESS } from './actions'

const initalState = {
  data: [],
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST_SUCCESS:
      const { data } = action.payload
      return { data }

    default:
      return state
  }
}

export { reducer }
