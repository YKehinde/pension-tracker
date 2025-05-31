import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../Button'

describe('Button', () => {
  it('renders with default (primary) style and label', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-600') // primary style
  })

  it('renders with secondary style', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /secondary/i })

    expect(button).toHaveClass('bg-gray-200')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText(/click me/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('respects button type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('renders with "remove" variant styles', () => {
    render(<Button variant="remove">Delete</Button>)
    const button = screen.getByRole('button', { name: /delete/i })
    expect(button).toHaveClass('text-red-500')
  })

  it('renders with "add" variant styles', () => {
    render(<Button variant="add">Add</Button>)
    const button = screen.getByRole('button', { name: /add/i })
    expect(button).toHaveClass('text-blue-600')
  })
})
