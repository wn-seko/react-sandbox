import React, { FC } from 'react'

interface CheckboxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
}

const Checkbox: FC<CheckboxProps> = ({ onChange, checked }) => {
  return <input type="checkbox" onChange={onChange} defaultChecked={checked} />
}

export default Checkbox
