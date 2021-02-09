import React, { FC, useContext } from 'react'
import { TodoPageContext } from './hooks'
import TodoForm from './TodoForm'

// organisms

// selector の代替のようなもの（例えば todos への format）
// UI の hooks がここに入るケースがある（例えば useModal など）
const useTodoList = () => {
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

const TodoList: FC<{}> = () => {
  const { todos } = useTodoList()

  return (
    <>
      {todos.map((todo) => (
        <TodoForm key={todo.id} todo={todo} />
      ))}
    </>
  )
}

export default TodoList