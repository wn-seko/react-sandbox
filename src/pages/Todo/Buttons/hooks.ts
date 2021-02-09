import { useContext } from 'react'
import { addTodoAsync, TodoPageContext } from '../hooks'

export const useButtons = () => {
    const { dispatch } = useContext(TodoPageContext)
  
    const onClickAdd = () => {
      dispatch(addTodoAsync({}))
    }
  
    const onClickRemoveDone = () => {
      dispatch({ type: 'REMOVE_DONE_TODO', payload: {} })
    }
  
    return { onClickAdd, onClickRemoveDone }
  }
  