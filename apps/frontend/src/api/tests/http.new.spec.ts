import { beforeEach, describe, expect, it, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { http } from '../http'
import { setToken } from '@/utils/token'
import { messageError } from '@/composables/message'

vi.mock('@/composables/message')

describe('http.new', () => {
  const mock = new MockAdapter(http)
  beforeEach(() => {
    mock.reset()
  })

  it('should set token to request headers authorization when token exists', async () => {
    const token = 'token'
    setToken(token)
    mock.onGet('/tasks').reply(200, {
      code: 0,
      data: [],
      message: '',
    })

    await http.get('/tasks')

    expect(mock.history.get[0].headers?.Authorization).toBe(`Bearer ${token}`)
  })

  it('should return data of the responseData when code is 0', async () => {
    const data = [{ name: '吃饭' }]
    mock.onGet('/tasks').reply(200, {
      code: 0,
      data,
      message: '',
    })

    const result = await http.get('/tasks')

    expect(result).toEqual(data)
  })

  it('should throw an error when code is not 0', async () => {
    const message = 'an error'
    mock.onGet('/tasks').reply(200, {
      code: -1,
      data: null,
      message,
    })

    await expect(() => http.get('/tasks')).rejects.toThrowError(message)
    expect(messageError).toBeCalledWith(message)
  })
})
