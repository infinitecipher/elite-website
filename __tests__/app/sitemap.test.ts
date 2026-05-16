import sitemap from '@/app/sitemap'

describe('sitemap()', () => {
  const entries = sitemap()

  it('returns exactly 5 entries', () => {
    expect(entries).toHaveLength(5)
  })

  it('homepage priority is 1.0', () => {
    const home = entries.find((e) => e.url === 'https://eliteglobalworkforce.com')
    expect(home).toBeDefined()
    expect(home?.priority).toBe(1.0)
  })

  it('includes the homepage URL', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://eliteglobalworkforce.com')
  })

  it('includes the #about URL', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://eliteglobalworkforce.com/#about')
  })

  it('includes the #services URL', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://eliteglobalworkforce.com/#services')
  })

  it('includes the #countries URL', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://eliteglobalworkforce.com/#countries')
  })

  it('includes the #contact URL', () => {
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('https://eliteglobalworkforce.com/#contact')
  })

  it('services priority (0.9) is greater than about priority (0.7)', () => {
    const services = entries.find((e) => e.url.endsWith('#services'))
    const about = entries.find((e) => e.url.endsWith('#about'))
    expect(services?.priority).toBeGreaterThan(about?.priority as number)
  })
})
