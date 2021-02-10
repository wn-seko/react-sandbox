import React, { FC } from 'react'

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const Input: FC<InputProps> = ({ onChange, value }) => {
  return <input type="text" onChange={onChange} defaultValue={value} />
}

export default Input
