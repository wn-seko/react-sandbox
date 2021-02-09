import React, { FC } from 'react'
import TodoForm from '../TodoForm'
import { useTodoList } from './hooks'

// organisms
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