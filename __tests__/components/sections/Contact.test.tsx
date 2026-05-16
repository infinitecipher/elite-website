import { render, screen } from '@testing-library/react'
import { Contact } from '@/components/sections/Contact'

describe('Contact', () => {
  beforeEach(() => {
    render(<Contact />)
  })

  it('renders the "Ready to Get Started?" heading', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /ready to get started/i
    )
  })

  it('WhatsApp link has correct href and opens externally', () => {
    const links = screen.getAllByRole('link')
    const waLink = links.find(
      (l) => l.getAttribute('href') === 'https://wa.me/96550552409'
    )
    expect(waLink).toBeDefined()
    expect(waLink).toHaveAttribute('target', '_blank')
  })

  it('email link has correct mailto href', () => {
    const links = screen.getAllByRole('link')
    const emailLink = links.find(
      (l) => l.getAttribute('href') === 'mailto:mylene.elite@gmail.com'
    )
    expect(emailLink).toBeDefined()
  })

  it('renders "Chat Now" CTA', () => {
    expect(screen.getByText('Chat Now')).toBeInTheDocument()
  })

  it('renders "Send Email" CTA', () => {
    expect(screen.getByText('Send Email')).toBeInTheDocument()
  })

  it('response time banner contains "Response time"', () => {
    expect(screen.getByText(/response time/i)).toBeInTheDocument()
  })
})
