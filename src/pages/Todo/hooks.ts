import { createContext, useReducer, Dispatch } from 'react'
import { request } from '../../requests'

interface TodoItem {
  id: string
  title: string
  done: boolean
}

interface State {
  todos: TodoItem[]
}

type Actions =
  { type: 'SET_TODOS', payload: { todos: TodoItem[] } } |
  { type: 'ADD_TODO', payload: { todo: TodoItem } } |
  { type: 'UPDATE_TODO'; payload: { todo: TodoItem } } |
  { type: 'REMOVE_TODO'; payload: { id: string } } |
  { type: 'REMOVE_DONE_TODO'; payload: { ids: string[] } }

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { todos: action.payload.todos }
    case 'ADD_TODO':
      return { todos: state.todos.concat(action.payload.todo) }
    case 'UPDATE_TODO':
      return { todos: state.todos.map(todo => todo.id === action.payload.todo.id ? action.payload.todo : todo) }
    case 'REMOVE_TODO':
      return { todos: state.todos.filter(todo => todo.id !== action.payload.id) }
    case 'REMOVE_DONE_TODO':
      return { todos: state.todos.filter(todo => !action.payload.ids.includes(todo.id)) }
    default:
      const typecheck: never = action
      return typecheck
  }
}

export const fetchTodoAsync = () => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await request.get('/todos')
    dispatch({ 'type': 'SET_TODOS', payload: { todos: response.data } })
  } catch(e) {
    console.error(e)
  }
}

export const addTodoAsync = () => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await request.post('/todos')
    dispatch({ 'type': 'ADD_TODO', payload: { todo: response.data } })
  } catch (e) {
    console.error(e);
  }
}

export const updateTodoAsync = (payload: { todo: TodoItem }) => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await request.put(`/todos/${payload.todo.id}`, { todo: payload.todo })
    dispatch({ 'type': 'UPDATE_TODO', payload: { todo: response.data } })
  } catch (e) {
    console.error(e)
  }
}

export const deleteTodoAsync = (payload: { id: string }) => async (dispatch: Dispatch<Actions>) => {
  try {
    await request.delete(`/todos/${payload.id}`)
    dispatch({ 'type': 'REMOVE_TODO', payload: { id: payload.id } })
  } catch(e) {
    console.error(e)
  }
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
