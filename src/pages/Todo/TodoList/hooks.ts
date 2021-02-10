import { useContext, useEffect } from 'react'
import { deleteTodoAsync, fetchTodoAsync, TodoPageContext, updateTodoAsync } from '../hooks'

// selector の代替のようなもの（例えば todos への format）
// UI の hooks がここに入るケースがある（例えば useModal など）
export const useTodoList = () => {
  const { state, dispatch } = useContext(TodoPageContext)

  useEffect(() => {
    dispatch(fetchTodoAsync())
  }, [])

  return {
    todos: state.todos.map((todo) => {
      const onChangeDone = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTodoAsync({ todo: { ...todo, done: e.target.checked } }))
      }
    
      const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTodoAsync({ todo: { ...todo, title: e.target.value } }))
      }
    
      const onClickDelete = () => {
        dispatch(deleteTodoAsync({ id: todo.id }))
      }

      return { ...todo, onChangeDone, onChangeTitle, onClickDelete }
    })
  }
}
