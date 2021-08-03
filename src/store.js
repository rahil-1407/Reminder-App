import rootReducer from './reducers/index'
import { createStore } from 'redux'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => {
  saveState({ reducer: store.getState().reducer })
})

export default store
