import { cn } from '@/lib/utils'

describe('cn()', () => {
  it('passes through a single class unchanged', () => {
    expect(cn('text-white')).toBe('text-white')
  })

  it('merges multiple class strings', () => {
    expect(cn('flex', 'items-center', 'gap-4')).toBe('flex items-center gap-4')
  })

  it('strips falsy values (undefined, null, false)', () => {
    expect(cn('block', undefined, null, false, 'mt-4')).toBe('block mt-4')
  })

  it('resolves tailwind conflicts — last value wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('resolves conflicting text colours', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles conditional class objects', () => {
    const result = cn({ active: true, disabled: false })
    expect(result).toContain('active')
    expect(result).not.toContain('disabled')
  })

  it('combines strings and conditional objects', () => {
    expect(cn('base', { extra: true, hidden: false })).toBe('base extra')
  })

  it('returns empty string when all inputs are falsy', () => {
    expect(cn(undefined, null, false)).toBe('')
  })
})
