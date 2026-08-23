import { CLIError, parseCLIArgs } from '@/bin/args'

describe('parseCLIArgs', () => {
  it('should use the same defaults as Commander', () => {
    expect(parseCLIArgs([])).toEqual({
      help: false,
      strict: true,
      refang: true,
      sort: true,
      punycode: false,
      only: undefined,
    })
  })

  it('should negate boolean options', () => {
    const options = parseCLIArgs(['--no-strict', '--no-refang', '--no-sort'])
    expect(options.strict).toBe(false)
    expect(options.refang).toBe(false)
    expect(options.sort).toBe(false)
  })

  it.each([['-p'], ['--punycode']])('should enable punycode with %s', (arg) => {
    expect(parseCLIArgs([arg]).punycode).toBe(true)
  })

  it.each([['-h'], ['--help']])('should set help with %s', (arg) => {
    expect(parseCLIArgs([arg]).help).toBe(true)
  })

  it.each([[['--only', 'ipv4s']], [['--only=ipv4s']], [['-o', 'ipv4s']], [['-oipv4s']]])(
    'should take %s as only',
    (args) => {
      expect(parseCLIArgs(args).only).toEqual(['ipv4s'])
    },
  )

  it.each([
    [['--only', 'ipv4s', 'domains']],
    [['-o', 'ipv4s', 'domains']],
    [['--only', 'ipv4s', '--only', 'domains']],
  ])('should take variadic values of %s as only', (args) => {
    expect(parseCLIArgs(args).only).toEqual(['ipv4s', 'domains'])
  })

  it('should stop taking variadic values at the next option', () => {
    expect(parseCLIArgs(['--only', 'ipv4s', 'domains', '--no-sort']).only).toEqual([
      'ipv4s',
      'domains',
    ])
  })

  it.each([
    [['--bogus'], "unknown option '--bogus'"],
    [['-x'], "unknown option '-x'"],
    [['--strict'], "unknown option '--strict'"],
    [['--only'], "option '-o, --only <types...>' argument missing"],
    [['extra'], 'too many arguments. Expected 0 arguments but got 1: extra.'],
    [['a', 'b'], 'too many arguments. Expected 0 arguments but got 2: a, b.'],
    [['--only', 'ipv4s', '-p', 'b'], 'too many arguments. Expected 0 arguments but got 1: b.'],
  ])('should throw a CLIError for %s', (args, message) => {
    expect(() => parseCLIArgs(args)).toThrowError(new CLIError(message))
  })

  it('should throw a CLIError for an unknown IoC type', () => {
    expect(() => parseCLIArgs(['--only', 'bogus'])).toThrowError(
      /^option '-o, --only <types\.\.\.>' argument 'bogus' is invalid\. Allowed choices are asns, /,
    )
  })
})
