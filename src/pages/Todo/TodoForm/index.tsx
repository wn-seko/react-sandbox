import React, { FC } from 'react'
import Button from '../../../components/Button'
import Checkbox from '../../../components/Checkbox'
import Input from '../../../components/Input'

// handler を受け取ることで任意のページで使用可能な molecules になる
// dispatch 等を受け取ってはいけない
interface TodoItem {
  id: string
  title: string
  done: boolean
  onChangeDone: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickDelete: () => void
}

interface TodoFormProps {
  todo: TodoItem
}

// molecules
const TodoForm: FC<TodoFormProps> = ({ todo }) => {
  const { title, done, onChangeDone, onChangeTitle, onClickDelete } = todo

  return (
    <div>
      <Checkbox onChange={onChangeDone} checked={done} />
      <Input onChange={onChangeTitle} value={title} />
      <Button onClick={onClickDelete}>
        削除
      </Button>
    </div>
  )
}

export default TodoForm
