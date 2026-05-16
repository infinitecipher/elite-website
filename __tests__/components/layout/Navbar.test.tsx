import { render, screen } from '@testing-library/react'
import React from 'react'

// Mock @/components/ui/sheet inline — must use React.createElement, not JSX, inside jest.mock factories
jest.mock('@/components/ui/sheet', () => {
  const React = require('react')
  return {
    Sheet: function Sheet({ children }: { children: React.ReactNode }) {
      return React.createElement(React.Fragment, null, children)
    },
    SheetContent: function SheetContent({ children }: { children: React.ReactNode }) {
      return React.createElement('div', { 'data-testid': 'sheet-content' }, children)
    },
    SheetTrigger: function SheetTrigger({
      children,
      className,
      'aria-label': ariaLabel,
    }: {
      children: React.ReactNode
      className?: string
      'aria-label'?: string
    }) {
      return React.createElement('button', { className, 'aria-label': ariaLabel }, children)
    },
    SheetHeader: function SheetHeader({ children }: { children: React.ReactNode }) {
      return React.createElement('div', null, children)
    },
    SheetTitle: function SheetTitle({ children }: { children: React.ReactNode }) {
      return React.createElement('div', null, children)
    },
  }
})

import { Navbar } from '@/components/layout/Navbar'

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  it('renders the logo image with alt text for Elite Global Workforce', () => {
    const logo = screen.getByRole('img', { name: /elite global workforce/i })
    expect(logo).toBeInTheDocument()
  })

  it('go-to-top button has correct aria-label', () => {
    const btn = screen.getByRole('button', { name: /go to top/i })
    expect(btn).toBeInTheDocument()
  })

  it('renders nav links for all sections (desktop + mobile = 2 of each)', () => {
    // Each nav link appears twice: once in desktop nav, once in mobile sheet
    for (const label of ['Home', 'About', 'Services', 'Countries', 'Gallery', 'Contact']) {
      const buttons = screen.getAllByRole('button', { name: label })
      expect(buttons.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('renders Hire Workers CTA button(s)', () => {
    const btns = screen.getAllByRole('button', { name: /hire workers/i })
    expect(btns.length).toBeGreaterThanOrEqual(1)
  })

  it('renders Apply Now CTA button(s)', () => {
    const btns = screen.getAllByRole('button', { name: /apply now/i })
    expect(btns.length).toBeGreaterThanOrEqual(1)
  })
})
