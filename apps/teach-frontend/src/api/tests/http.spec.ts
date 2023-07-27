import { beforeEach, describe, expect, it, vi } from 'vitest'
import AxiosMockAdapter from 'axios-mock-adapter'
import { http } from '../http'
import { cleanToken, setToken } from '@/utils/token'
import { messageError, messageRedirectToSignIn } from '@/composables/message'
import { goToLogin } from '@/composables'

vi.mock('@/composables/message')

describe('http', () => {
  let axiosMock: AxiosMockAdapter
  beforeEach(() => {
    axiosMock = new AxiosMockAdapter(http)
    cleanToken()
    vi.clearAllMocks()
  })

  it('should set headers Authorization when have token', async () => {
    const token = 'token'
    setToken(token)

    axiosMock.onGet('/tasks').reply(200, {
      code: 0,
      data: null,
      message: '',
    })

    await http.get('/tasks')

    expect(axiosMock.history.get[0].headers?.Authorization).toBe(
      `Bearer ${token}`,
    )
  })

  it('should return data of responseData when code is 0', async () => {
    const data = 'cxr'
    axiosMock.onGet('/tasks').reply(200, {
      code: 0,
      data,
      message: '',
    })

    const result = await http.get('/tasks')

    expect(result).toBe(data)
  })

  it('should throw an error and show error message when code is not 0', async () => {
    const message = 'an error'
    axiosMock.onGet('/tasks').reply(200, {
      code: -1,
      data: null,
      message,
    })

    await expect(() => http.get('/tasks')).rejects.toThrowError(message)
    expect(messageError).toBeCalledWith(message)
  })

  it('should redirect to sign in and show error message when http status code is 401', async () => {
    axiosMock.onGet('/tasks').reply(401)

    await expect(() => http.get('/tasks')).rejects.toThrowError()
    expect(messageRedirectToSignIn).toBeCalledWith(goToLogin)
  })
})
