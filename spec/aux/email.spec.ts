import { emailRegex } from '@/aux/email'

describe('emailRegex', () => {
  it('should match with all email values', () => {
    const input = 'test@test.co.jp\ntest@test.com\nhoge@hoge'
    const matches = input.match(emailRegex())
    expect(matches).toEqual(['test@test.co.jp', 'test@test.com'])
  })

  it('should not match a run of local part characters without an address', () => {
    expect(`${'A'.repeat(100)}.`.match(emailRegex())).toBeNull()
    expect(`${'A'.repeat(100)}@`.match(emailRegex())).toBeNull()
  })
})
