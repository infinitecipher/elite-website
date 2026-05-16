import { render, screen } from '@testing-library/react'
import { About } from '@/components/sections/About'

describe('About', () => {
  beforeEach(() => {
    render(<About />)
  })

  it('renders the "About Us" badge', () => {
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })

  it('heading contains "Global Recruitment"', () => {
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(/global recruitment/i)
  })

  it('renders the "Ethical Recruitment" trust badge title', () => {
    expect(screen.getByText('Ethical Recruitment')).toBeInTheDocument()
  })

  it('renders the "Verified Employers" trust badge title', () => {
    expect(screen.getByText('Verified Employers')).toBeInTheDocument()
  })

  it('renders the "Transparent Process" trust badge title', () => {
    expect(screen.getByText('Transparent Process')).toBeInTheDocument()
  })

  it('mentions 2023 as the founding year', () => {
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })
})
