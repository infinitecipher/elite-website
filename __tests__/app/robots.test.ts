import robots from '@/app/robots'

describe('robots()', () => {
  const result = robots()

  it('allows all user agents to crawl /', () => {
    const rule = result.rules
    const rules = Array.isArray(rule) ? rule : [rule]
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard).toBeDefined()
    expect(wildcard?.allow).toBe('/')
  })

  it('disallows /api/ for all agents', () => {
    const rule = result.rules
    const rules = Array.isArray(rule) ? rule : [rule]
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard?.disallow).toContain('/api/')
  })

  it('disallows /_next/ for all agents', () => {
    const rule = result.rules
    const rules = Array.isArray(rule) ? rule : [rule]
    const wildcard = rules.find((r) => r.userAgent === '*')
    expect(wildcard?.disallow).toContain('/_next/')
  })

  it('includes the sitemap URL', () => {
    expect(result.sitemap).toBe('https://eliteglobalworkforce.com/sitemap.xml')
  })
})
