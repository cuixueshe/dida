import { describe, expect, it } from 'vitest'
import { validatePasswordLength, validatePasswordSame, validateUsernameLength } from '../validator'

describe('validator', () => {
  describe('validator username', () => {
    it('should validate username length ', () => {
      expect(validateUsernameLength('cuixiaorui')).toBe(true)
    })

    it.each(['12345', '1234'])('should return false when username is %i because its length <=5', (i) => {
      expect(validateUsernameLength(i)).toBe(false)
    })

    // it('should return false when username length <=5', () => {
    //   expect(validateUsernameLength('12345')).toBe(false)
    //   expect(validateUsernameLength('1234')).toBe(false)
    // })

    it('should return false when username length >=25', () => {
      expect(validateUsernameLength('0123456789012345678901234')).toBe(false)
      expect(validateUsernameLength('01234567890123456789012345')).toBe(false)
    })
  })

  describe('validator password', () => {
    it('should validate password length ', () => {
      expect(validatePasswordLength('cuixiaorui')).toBe(true)
    })

    it.each(['123456', '12345'])('should return false when password is %i because its length <=6', (i) => {
      expect(validatePasswordLength(i)).toBe(false)
    })

    it('should return false when password length >=30', () => {
      expect(validatePasswordLength('012345678901234567890123456789')).toBe(false)
      expect(validatePasswordLength('0123456789012345678901234567890')).toBe(false)
    })
  })

  it('should validate Password Same', () => {
    expect(validatePasswordSame('cuixiaorui', 'cuixiaorui')).toBe(true)
  })
})
