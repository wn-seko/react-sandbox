import { createContext, useReducer, Dispatch } from 'react'

interface TodoItem {
  id: string
  title: string
  done: boolean
}

interface State {
  todos: TodoItem[]
}

type Actions =
  { type: 'ADD_TODO'; payload: any } |
  { type: 'UPDATE_TODO'; payload: any } |
  { type: 'REMOVE_TODO'; payload: any } |
  { type: 'REMOVE_DONE_TODO'; payload: any }

const timer = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'ADD_TODO':
      // setTodos(todos.concat({ id: uuid(), title: '', done: false }))
      return state
    case 'UPDATE_TODO':
      // setTodos(todos.map(previous => previous.id === todo.id ? todo : previous))
      return state
    case 'REMOVE_TODO':
      // setTodos(todos.filter(todo => todo.id !== id))
      return state
    case 'REMOVE_DONE_TODO':
      // setTodos(todos.filter(todo => !todo.done))
      return state
    default:
      const typecheck: never = action
      return typecheck
  }
}

export const addTodoAsync = (payload: any) => async (dispatch: Dispatch<Actions>) => {
  await timer(10)
  dispatch({ 'type': 'ADD_TODO', payload })
}

const initialState: State = {
  todos: []
}

export const useTodoPageContextValue = (values: State = initialState) => {
  const [state, dispatch] = useReducer(reducer, values)

  const customDispatch = (action: Actions | ((dispatch: Dispatch<Actions>) => Promise<void>)) => {
    if (typeof action === 'function') {
      action(dispatch)
    } else {
      dispatch(action)
    }
  }

  return { state, dispatch: customDispatch }
}

export const TodoPageContext = createContext<{
  state: State,
  dispatch: (action: Actions | ((dispatch: Dispatch<Actions>) => Promise<void>)) => void
}>({
  state: initialState,
  dispatch: () => {}
})

// const getStorageItem = (key: string) => {
//   window.localStorage.getItem(key)
// }

// const setStorageItem = (key: string, value: string) => {
//   window.localStorage.setItem(key, value)
// }

// const removeStorageItem = (key: string) => {
//   window.localStorage.removeItem(key)
// }

// export const TodoPageContext = createContext({
//   getStorageItem,
//   setStorageItem,
//   removeStorageItem
// })
