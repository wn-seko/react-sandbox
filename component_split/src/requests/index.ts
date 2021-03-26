import { useState } from 'react'
import axios, { AxiosPromise } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TodoMock } from './mock'

const mock = new MockAdapter(axios, { delayResponse: 100 })
TodoMock(mock)

axios.defaults.timeout = 50000

declare const API_URL: string

export const request = axios.create({
  baseURL: API_URL,
  responseType: 'json',
})

export const useRequest = <T>(func: () => AxiosPromise<T>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState(null)

  func()
    .then(response => {
      setIsLoading(false)
      setData(response.data)
    })
    .catch(error => {
      setIsLoading(false)
      setError(error)
    })

    return { isLoading, data, error }
}
