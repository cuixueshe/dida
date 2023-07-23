import { beforeEach, describe, expect, it, vi } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { http } from '../http'
import { messageError, messageRedirectToSignIn } from '@/composables/message'
import { setToken } from '@/utils/token'

vi.mock('@/composables/message')

interface ResponseData {
  code?: number
  data?: unknown
  message?: string
}

const mock: MockAdapter = new MockAdapter(http)

function mockReply(statusCode: number): void
function mockReply(statusCode: number, responseData: ResponseData): void
function mockReply(statusCode: number, responseData?: ResponseData): void {
  if (responseData) {
    const { code = 0, data = null, message = '' } = responseData
    mock.onGet('/tasks').reply(statusCode, { code, data, message })
  }
  else {
    mock.onGet('/tasks').reply(statusCode)
  }
}

function triggerApiRequest() {
  return http.get('/tasks')
}

describe('http', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mock.reset()
  })

  it('should set headers Authorization when token exists', async () => {
    const token = 'mynameistoken'
    setToken(token)
    mockReply(200, { code: 0 })
    await triggerApiRequest()

    expect(mock.history.get[0].headers?.Authorization).toBe(`Bearer ${token}`)
  })

  it('should return data of the response when code is 0', async () => {
    const data = [{ name: '吃饭' }]
    mockReply(200, { code: 0, data })

    const result = await triggerApiRequest()

    expect(result).toEqual(data)
  })

  it('should throw an error when code is not  0', async () => {
    const message = 'an error'

    mockReply(200, { code: -1, message })

    await expect(() => triggerApiRequest()).rejects.toThrowError(message)
    expect(messageError).toBeCalledWith(message)
  })

  it('should redirect to signin when http code is 401', async () => {
    mockReply(401)

    await expect(() => http.get('/tasks')).rejects.toThrow()
    expect(messageRedirectToSignIn).toBeCalled()
  })
})
