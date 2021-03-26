import MockAdapter from 'axios-mock-adapter'
import { v4 as uuid } from 'uuid'

interface TodoItem {
  id: string
  title: string
  done: boolean
}

export const TodoMock = (mock: MockAdapter): void => {
  mock.onGet('/todos').reply(() => {
    const todos = getTodosFromLocalStorage()
    return [200, todos]
  })

  mock.onPost('/todos').reply(() => {
    const todos = getTodosFromLocalStorage()

    const newTodo = {
      id: uuid(),
      title: '',
      done: false
    }

    todos.push(newTodo)

    setTodosToLocalStorage(todos)

    return [201, newTodo]
  })

  mock.onPut(/^\/todos\/[^/]+$/).reply(config => {
    const todos = getTodosFromLocalStorage()

    const todoId = (config.url || '').split('/')[2]
    const { todo } = parseData<{ todo: TodoItem }>(config.data)

    const updated = todos.map(t => t.id === todoId ? todo : t)
    setTodosToLocalStorage(updated)

    return [200, updated]
  })

  mock.onDelete(/^\/todos\/[^/]+$/).reply(config => {
    const todos = getTodosFromLocalStorage()

    const todoId = (config.url || '').split('/')[2]

    const updated = todos.filter(todo => todo.id !== todoId)
    setTodosToLocalStorage(updated)

    return [200, updated]
  })
}

const getTodosFromLocalStorage = () => {
  const todosRaw = window.localStorage.getItem('todos') || ''
  return parseTodo(todosRaw)
}

const setTodosToLocalStorage = (todos: TodoItem[]) => {
  const todosRaw = JSON.stringify(todos)
  window.localStorage.setItem('todos', todosRaw)
}

const parseTodo = (data: string): TodoItem[] => {
  try {
    return JSON.parse(data)
  } catch(e) {
    return []
  }
}

const parseData = <T>(data: string | Record<string, unknown>): T => {
  if (typeof data === 'object') {
    return data as T
  }

  try {
    return JSON.parse(data)
  } catch (e) {
    return {} as T
  }
}
