import { render, screen, fireEvent } from '@testing-library/react'
import TextInput from '../TextInput'

describe('TextInput', () => {
  it('renders with label and placeholder', () => {
    render(
      <TextInput
        label="Retirement Age"
        name="retirementAge"
        placeholder="Enter age"
        value="0"
        onChange={() => {}}
      />,
    )

    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter age/i)).toBeInTheDocument()
  })

  it('renders a required asterisk if required', () => {
    render(
      <TextInput
        label="Income"
        name="income"
        required={true}
        value=""
        onChange={() => {}}
      />,
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('calls onChange handler when typing', () => {
    const handleChange = jest.fn()
    render(
      <TextInput
        label="Contribution"
        name="contribution"
        value=""
        onChange={handleChange}
      />,
    )

    const input = screen.getByLabelText(/contribution/i)
    fireEvent.change(input, { target: { value: '100' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('displays error text if provided', () => {
    render(
      <TextInput
        label="Pension"
        name="pension"
        value=""
        error="This field is required"
        onChange={() => {}}
      />,
    )

    expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
  })
})
