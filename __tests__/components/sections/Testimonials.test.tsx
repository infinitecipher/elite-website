import { render, screen } from '@testing-library/react'
import { Testimonials } from '@/components/sections/Testimonials'

// VIDEOS is Array.from({ length: 9 }, ...) in Testimonials.tsx

describe('Testimonials', () => {
  beforeEach(() => {
    render(<Testimonials />)
  })

  it('renders the section heading "Hear From Our Placed Workers"', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /hear from our placed workers/i
    )
  })

  it('renders the "Success Stories" badge', () => {
    expect(screen.getByText('Success Stories')).toBeInTheDocument()
  })

  it('renders exactly 9 video elements', () => {
    // Each VideoCard contains a <video> element
    const videos = document.querySelectorAll('video')
    expect(videos).toHaveLength(9)
  })

  it('renders play buttons for all 9 videos', () => {
    const playButtons = screen.getAllByRole('button', { name: /play worker testimonial/i })
    expect(playButtons).toHaveLength(9)
  })

  it('renders scroll-left and scroll-right navigation buttons', () => {
    expect(screen.getByRole('button', { name: /scroll left/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /scroll right/i })).toBeInTheDocument()
  })
})
