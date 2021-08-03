import { Types } from './actionTypes'

export const ActionCreators = {
  updatePast: (pastReminder) => {
    return {
      type: Types.UPDATE_PAST,
      payload: pastReminder,
    }
  },
  updateFuture: (futureReminder) => {
    return {
      type: Types.UPDATE_FUTURE,
      payload: futureReminder,
    }
  },
}
