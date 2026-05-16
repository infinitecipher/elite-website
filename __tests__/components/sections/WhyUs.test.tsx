import { render, screen } from '@testing-library/react'
import { WhyUs } from '@/components/sections/WhyUs'

// REASONS from WhyUs.tsx:
// "Trusted Recruitment Network"
// "Fast Deployment Process"
// "Verified Employers Only"
// "Transparent Hiring Process"
// "International Reach"

describe('WhyUs', () => {
  beforeEach(() => {
    render(<WhyUs />)
  })

  it('renders the section heading "Why Elite Global Workforce?"', () => {
    expect(
      screen.getByRole('heading', { level: 2 })
    ).toHaveTextContent(/why elite global workforce/i)
  })

  it('renders the "Why Choose Us" badge', () => {
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument()
  })

  it('renders "Trusted Recruitment Network" reason title', () => {
    expect(screen.getByText('Trusted Recruitment Network')).toBeInTheDocument()
  })

  it('renders "Fast Deployment Process" reason title', () => {
    expect(screen.getByText('Fast Deployment Process')).toBeInTheDocument()
  })

  it('renders "Verified Employers Only" reason title', () => {
    expect(screen.getByText('Verified Employers Only')).toBeInTheDocument()
  })

  it('renders "Transparent Hiring Process" reason title', () => {
    expect(screen.getByText('Transparent Hiring Process')).toBeInTheDocument()
  })

  it('renders "International Reach" reason title', () => {
    expect(screen.getByText('International Reach')).toBeInTheDocument()
  })
})
