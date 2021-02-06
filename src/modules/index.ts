import { connectRouter } from 'connected-react-router'
import { ActionCreatorsMapObject, combineReducers } from 'redux'
import history from './store/history'

// Action
export const actions = {}

// Reducer
const rootReducer = combineReducers({
  router: connectRouter(history),
})

export const selectors = {}

export type RootState = ReturnType<typeof rootReducer>

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>

export default rootReducer
