import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders the email link', () => {
    const email = screen.getByRole('link', { name: /mylene\.elite@gmail\.com/i })
    expect(email).toHaveAttribute('href', 'mailto:mylene.elite@gmail.com')
  })

  it('renders the WhatsApp link opening in a new tab', () => {
    // Footer renders WhatsApp as plain text inside a link — match by partial href
    const links = screen.getAllByRole('link')
    const waLink = links.find(
      (l) => l.getAttribute('href') === 'https://wa.me/96550552409'
    )
    expect(waLink).toBeDefined()
    expect(waLink).toHaveAttribute('target', '_blank')
  })

  it('renders all 6 quick links with correct hrefs', () => {
    const expectedLinks = [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Countries', href: '#countries' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Contact', href: '#contact' },
    ]
    for (const { label, href } of expectedLinks) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('href', href)
    }
  })

  it('renders destination country badges', () => {
    for (const country of ['Kuwait', 'Croatia', 'Albania']) {
      expect(screen.getByText(country)).toBeInTheDocument()
    }
  })

  it('copyright text contains "Elite Global Workforce"', () => {
    expect(
      screen.getByText(/elite global workforce/i)
    ).toBeInTheDocument()
  })

  it('renders the InfiniteCipher link with correct href', () => {
    const links = screen.getAllByRole('link')
    const icLink = links.find(
      (l) => l.getAttribute('href') === 'https://www.infinitecipher.com/'
    )
    expect(icLink).toBeDefined()
    expect(icLink).toHaveAttribute('target', '_blank')
    expect(icLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
