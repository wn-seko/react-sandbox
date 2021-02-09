import React, { FC } from 'react'
import Buttons from './Buttons'
import { TodoPageContext, useTodoPageContextValue } from './hooks'
import TodoList from './TodoList'

// pages

const TodoPage: FC<{}> = () => {
  const contextValues = useTodoPageContextValue()

  // organisms の配置のみを決める
  // ex) display: grid;
  return (
    <TodoPageContext.Provider value={contextValues}>
      <div>
        <div>
          <Buttons />
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </TodoPageContext.Provider>
  )
}

export default TodoPage
