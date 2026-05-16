import { render, screen } from '@testing-library/react'
import { Stats } from '@/components/sections/Stats'

// useInView is mocked globally in __mocks__/framer-motion.js to return true

describe('Stats', () => {
  beforeEach(() => {
    render(<Stats />)
  })

  it('section heading contains "Numbers That Tell Our Story"', () => {
    expect(
      screen.getByText(/numbers that tell our story/i)
    ).toBeInTheDocument()
  })

  it('renders "Workers Deployed Overseas" stat label', () => {
    expect(screen.getByText('Workers Deployed Overseas')).toBeInTheDocument()
  })

  it('renders "Workers Placed in Kuwait" stat label', () => {
    expect(screen.getByText('Workers Placed in Kuwait')).toBeInTheDocument()
  })

  it('renders "Countries Supported" stat label', () => {
    expect(screen.getByText('Countries Supported')).toBeInTheDocument()
  })

  it('renders "Worker Testimonials" stat label', () => {
    expect(screen.getByText('Worker Testimonials')).toBeInTheDocument()
  })

  it('renders counter elements without crashing (initial value 0 is acceptable)', () => {
    // AnimatedCounter starts at 0 and counts up; in tests it may stay at 0
    // We just assert no error is thrown and the section renders
    expect(screen.getByText(/numbers that tell our story/i)).toBeInTheDocument()
  })
})
