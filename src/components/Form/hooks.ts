import { createContext, useContext, useEffect, useState } from 'react'

export const HelloPageContext = createContext({
  foo: {
    value: 'foo'
  },
})

// HogePageContext(データストア) => HogePageForm(Hogeページ専用のOrgs)のViewModelの変換用hooks
export const useHelloPageForm = () => {
  const { foo } = useContext(HelloPageContext)
  const [text, setText] = useState(foo.value)

  useEffect(() => {
      setText(foo.value)
  }, [foo.value])

  return {
      text,
      onTextChange(e: any) {
        setText(e.target.value)
      },
      onSubmit() {
        console.log(`submit: ${text}`)
      },
  }
}
