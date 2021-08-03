import { Types } from '../actions/actionTypes'

const initialState = {
  pastReminder: [],
  futureReminder: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_PAST:
      return {
        ...state,
        pastReminder: action.payload,
      }
    case Types.UPDATE_FUTURE:
      return {
        ...state,
        futureReminder: action.payload,
      }
    default:
      return state
  }
}

export default reducer
