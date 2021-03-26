import React, { FC } from 'react'
import Button from '../../../components/Button'
import { useButtons } from './hooks'

// organisms
const Buttons: FC<{}> = () => {
  const { onClickAdd, onClickRemoveDone } = useButtons()

  return (
    <div>
      <Button onClick={onClickAdd}>
        追加
      </Button>
      <Button onClick={onClickRemoveDone}>
        一括削除
      </Button>
    </div>
  )
}

export default Buttons
