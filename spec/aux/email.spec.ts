import { emailRegex } from '@/aux/email'

describe('emailRegex', () => {
  it('should match with all email values', () => {
    const input = 'test@test.co.jp\ntest@test.com\nhoge@hoge'
    const matches = input.match(emailRegex())
    expect(matches).toEqual(['test@test.co.jp', 'test@test.com'])
  })

  it('should match a local part at the RFC 5321 limit', () => {
    const input = `${'a'.repeat(64)}@example.com`
    expect(input.match(emailRegex())).toEqual([input])
  })

  it('should not match a local part over the RFC 5321 limit', () => {
    // Rejected outright, not reported as its trailing 64 characters
    expect(`${'a'.repeat(65)}@example.com`.match(emailRegex())).toBeNull()
  })

  it('should not match a run of local part characters without an address', () => {
    expect(`${'A'.repeat(100)}.`.match(emailRegex())).toBeNull()
    expect(`${'A'.repeat(100)}@`.match(emailRegex())).toBeNull()
  })
})
