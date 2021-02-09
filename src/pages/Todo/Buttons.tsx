import React, { FC, useContext } from 'react'
import Button from '../../components/Button'
import { addTodoAsync, TodoPageContext } from './hooks'

// organisms

const useButtons = () => {
  const { dispatch } = useContext(TodoPageContext)

  const onClickAdd = () => {
    dispatch(addTodoAsync({}))

    // dispatch(addTodoAsync({ type: 'ADD_TODO', payload: {} }))
  }

  const onClickRemoveDone = () => {
    dispatch({ type: 'REMOVE_DONE_TODO', payload: {} })
  }

  return { onClickAdd, onClickRemoveDone }
}

const Buttons: FC<{}> = () => {
  const { onClickAdd, onClickRemoveDone } = useButtons()

  return (
    <div>
      <Button onClick={onClickAdd}>
        追加
      </Button>
      <Button onClick={onClickAdd}>
        フィルタ
      </Button>
      <Button onClick={onClickRemoveDone}>
        一括削除
      </Button>
    </div>
  )
}

export default Buttons
