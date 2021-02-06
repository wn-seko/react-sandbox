import React from 'react'
import { useHelloPageForm } from './hooks';

const Form = () => {
  const { text, onTextChange, onSubmit } = useHelloPageForm();

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={text} onChange={onTextChange} />
    </form>
  );
};

export default Form
