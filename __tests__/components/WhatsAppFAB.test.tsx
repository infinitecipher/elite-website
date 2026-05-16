import { render, screen } from '@testing-library/react'
import { WhatsAppFAB } from '@/components/WhatsAppFAB'

describe('WhatsAppFAB', () => {
  it('renders a link to the WhatsApp number', () => {
    render(<WhatsAppFAB />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://wa.me/96550552409')
  })

  it('opens in a new tab with noopener', () => {
    render(<WhatsAppFAB />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('has an aria-label mentioning WhatsApp', () => {
    render(<WhatsAppFAB />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('aria-label', expect.stringMatching(/whatsapp/i))
  })
})
