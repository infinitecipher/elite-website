import { render, screen } from '@testing-library/react'

// Mock next/dynamic so Globe renders synchronously without WebGL
jest.mock('next/dynamic', () =>
  jest.fn().mockImplementation(() => {
    const React = require('react')
    function GlobeMock() {
      return React.createElement('div', { 'data-testid': 'globe' })
    }
    return GlobeMock
  })
)

import { Hero } from '@/components/sections/Hero'

// Hero renders TextContent twice — once for desktop layout, once for mobile.
// Use getAllBy* queries to handle both copies.
describe('Hero', () => {
  beforeEach(() => {
    render(<Hero />)
  })

  it('renders the globe placeholder', () => {
    expect(screen.getAllByTestId('globe').length).toBeGreaterThanOrEqual(1)
  })

  it('h1 contains "Connecting Global Talent"', () => {
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBeGreaterThan(0)
    expect(headings[0]).toHaveTextContent(/connecting global talent/i)
  })

  it('renders "Apply for a Job" button', () => {
    expect(screen.getAllByRole('button', { name: /apply for a job/i }).length).toBeGreaterThan(0)
  })

  it('renders "Hire Workers" button', () => {
    expect(screen.getAllByRole('button', { name: /hire workers/i }).length).toBeGreaterThan(0)
  })

  it('renders "WhatsApp Us" link with correct href', () => {
    const links = screen.getAllByRole('link', { name: /whatsapp us/i })
    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute('href', 'https://wa.me/96550552409')
  })

  it('renders "Licensed International Recruitment Agency" badge', () => {
    const badges = screen.getAllByText(/licensed international recruitment agency/i)
    expect(badges.length).toBeGreaterThan(0)
  })

  it('renders "50+" stat value', () => {
    expect(screen.getAllByText('50+').length).toBeGreaterThan(0)
  })

  it('renders "6+" stat value', () => {
    expect(screen.getAllByText('6+').length).toBeGreaterThan(0)
  })

  it('renders "Est. 2023" stat value', () => {
    expect(screen.getAllByText('Est. 2023').length).toBeGreaterThan(0)
  })
})
