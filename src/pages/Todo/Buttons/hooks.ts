import { useContext } from 'react'
import { addTodoAsync, TodoPageContext } from '../hooks'

export const useButtons = () => {
    const { state, dispatch } = useContext(TodoPageContext)
  
    const onClickAdd = () => {
      dispatch(addTodoAsync())
    }
  
    const onClickRemoveDone = () => {
      const doneTodoIds = state.todos.filter(todo => todo.done).map(todo => todo.id)
      dispatch({ type: 'REMOVE_DONE_TODO', payload: { ids: doneTodoIds } })
    }
  
    return { onClickAdd, onClickRemoveDone }
  }
  