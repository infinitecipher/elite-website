import { render, screen } from '@testing-library/react'
import { Countries } from '@/components/sections/Countries'

describe('Countries', () => {
  beforeEach(() => {
    render(<Countries />)
  })

  it('renders the "Our Global Network" heading', () => {
    expect(screen.getByText('Our Global Network')).toBeInTheDocument()
  })

  // Source countries
  it('renders "Nepal" as a source country', () => {
    expect(screen.getByText('Nepal')).toBeInTheDocument()
  })

  it('renders "Bhutan" as a source country', () => {
    expect(screen.getByText('Bhutan')).toBeInTheDocument()
  })

  it('renders "India" as a source country', () => {
    expect(screen.getByText('India')).toBeInTheDocument()
  })

  it('renders "Philippines" as a source country', () => {
    expect(screen.getByText('Philippines')).toBeInTheDocument()
  })

  it('renders "Kenya" as a source country', () => {
    expect(screen.getByText('Kenya')).toBeInTheDocument()
  })

  it('renders "Sri Lanka" as a source country', () => {
    expect(screen.getByText('Sri Lanka')).toBeInTheDocument()
  })

  // Destination countries
  it('renders "Kuwait" as a destination country', () => {
    expect(screen.getByText('Kuwait')).toBeInTheDocument()
  })

  it('renders "Croatia" as a destination country', () => {
    expect(screen.getByText('Croatia')).toBeInTheDocument()
  })

  it('renders "Albania" as a destination country', () => {
    expect(screen.getByText('Albania')).toBeInTheDocument()
  })

  it('marks Kuwait as "Primary"', () => {
    expect(screen.getByText('Primary')).toBeInTheDocument()
  })
})
