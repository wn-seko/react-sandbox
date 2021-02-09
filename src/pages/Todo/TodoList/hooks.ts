import { useContext } from 'react'
import { TodoPageContext } from '../hooks'

// selector の代替のようなもの（例えば todos への format）
// UI の hooks がここに入るケースがある（例えば useModal など）
export const useTodoList = () => {
  const { state, dispatch } = useContext(TodoPageContext)

  return {
    todos: state.todos.map((todo) => {
      const onChangeDone = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'UPDATE_TODO', payload: { done: e.target.checked } })
      }
    
      const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'UPDATE_TODO', payload: { title: e.target.value } })
      }
    
      const onClickDelete = () => {
        dispatch({ type: 'REMOVE_TODO', payload: { id: todo.id } })
      }

      return { ...todo, onChangeDone, onChangeTitle, onClickDelete }
    })
  }
}
