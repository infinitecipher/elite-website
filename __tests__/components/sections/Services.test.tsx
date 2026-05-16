import { render, screen } from '@testing-library/react'
import { Services } from '@/components/sections/Services'

describe('Services', () => {
  beforeEach(() => {
    render(<Services />)
  })

  it('renders the "What We Offer" heading', () => {
    expect(screen.getByText('What We Offer')).toBeInTheDocument()
  })

  it('renders the "For Employers" card title', () => {
    expect(screen.getByText('For Employers')).toBeInTheDocument()
  })

  it('renders the "For Applicants" card title', () => {
    expect(screen.getByText('For Applicants')).toBeInTheDocument()
  })

  // Employer services
  it('renders "Overseas Manpower Sourcing" service', () => {
    expect(screen.getByText('Overseas Manpower Sourcing')).toBeInTheDocument()
  })

  it('renders "Local Kuwait Staffing" service', () => {
    expect(screen.getByText('Local Kuwait Staffing')).toBeInTheDocument()
  })

  it('renders "Candidate Screening" service', () => {
    expect(screen.getByText('Candidate Screening')).toBeInTheDocument()
  })

  it('renders "Visa & Deployment Coordination" service', () => {
    expect(screen.getByText('Visa & Deployment Coordination')).toBeInTheDocument()
  })

  // Applicant services
  it('renders "Job Placement Abroad" service', () => {
    expect(screen.getByText('Job Placement Abroad')).toBeInTheDocument()
  })

  it('renders "Career Matching" service', () => {
    expect(screen.getByText('Career Matching')).toBeInTheDocument()
  })

  it('renders "Employer Connection" service', () => {
    expect(screen.getByText('Employer Connection')).toBeInTheDocument()
  })

  it('renders "Recruitment Process Guidance" service', () => {
    expect(screen.getByText('Recruitment Process Guidance')).toBeInTheDocument()
  })
})
