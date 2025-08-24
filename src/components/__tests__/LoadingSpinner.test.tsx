import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Please wait..." />)
    
    expect(screen.getByText('Please wait...')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="small" />)
    expect(screen.getByText('Loading...')).toHaveClass('text-sm')

    rerender(<LoadingSpinner size="medium" />)
    expect(screen.getByText('Loading...')).toHaveClass('text-xl')

    rerender(<LoadingSpinner size="large" />)
    expect(screen.getByText('Loading...')).toHaveClass('text-2xl')
  })

  it('has correct container structure', () => {
    render(<LoadingSpinner message="Test message" />)
    
    const container = screen.getByText('Test message').parentElement
    expect(container).toHaveClass('min-h-screen', 'bg-gray-900', 'flex', 'items-center', 'justify-center')
  })

  it('applies correct text color', () => {
    render(<LoadingSpinner />)
    
    expect(screen.getByText('Loading...')).toHaveClass('text-gray-400')
  })
})
