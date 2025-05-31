import { render, screen, fireEvent } from '@testing-library/react'
import PensionForm from '../PensionForm'
import React from 'react'

describe('PensionForm', () => {
  const onSubmitAction = jest.fn()

  beforeEach(() => {
    onSubmitAction.mockClear()
  })

  it('renders all input fields', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    expect(
      screen.getByLabelText(/Desired Retirement Income/i),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Employer Monthly Contribution/i),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Personal Monthly Contribution/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/retirement age/i)).toBeInTheDocument()
  })

  it('updates state when typing in inputs', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    const incomeInput = screen.getByLabelText(/Desired Retirement Income/i)
    fireEvent.change(incomeInput, { target: { value: '18000' } })
    expect(incomeInput).toHaveValue(18000)
  })

  it('calls onSubmitAction with form data', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    fireEvent.change(screen.getByLabelText(/Desired Retirement Income/i), {
      target: { value: '20000' },
    })
    fireEvent.change(screen.getByLabelText(/Employer Monthly Contribution/i), {
      target: { value: '300' },
    })
    fireEvent.change(screen.getByLabelText(/Personal Monthly Contribution/i), {
      target: { value: '250' },
    })
    fireEvent.change(screen.getByLabelText(/retirement age/i), {
      target: { value: '65' },
    })

    const submit = screen.getByRole('button', { name: /calculate/i })
    fireEvent.click(submit)

    expect(onSubmitAction).toHaveBeenCalledWith(
      expect.objectContaining({
        desiredIncome: 20000,
        employerContribution: 300,
        personalContribution: 250,
        retirementAge: 65,
      }),
    )
  })

  it('adds a new existing pension pot when "+ Add Pension Pot" is clicked', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    const addButton = screen.getByRole('button', {
      name: /\+ Add Pension Pot/i,
    })
    fireEvent.click(addButton)

    // After adding, there should be one input for existing pots
    expect(screen.getByTestId('existing-pot-0')).toBeInTheDocument()
    expect(screen.getByTestId('existing-pot-0')).toHaveValue(0)
  })

  it('updates value of an existing pension pot', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    const addButton = screen.getByRole('button', {
      name: /\+ Add Pension Pot/i,
    })
    fireEvent.click(addButton)

    const potInput = screen.getByTestId('existing-pot-0')
    fireEvent.change(potInput, { target: { value: '5000' } })
    expect(potInput).toHaveValue(5000)
  })

  it('removes an existing pension pot when "Remove" is clicked', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    const addButton = screen.getByRole('button', {
      name: /\+ Add Pension Pot/i,
    })
    fireEvent.click(addButton)
    fireEvent.click(addButton) // Add two pots

    // Both pots should be present
    expect(screen.getByTestId('existing-pot-0')).toBeInTheDocument()
    expect(screen.getByTestId('existing-pot-1')).toBeInTheDocument()

    const removeButton = screen.getByTestId('existing-pot-0-remove')
    fireEvent.click(removeButton)

    // Only the second pot should remain
    expect(screen.queryByTestId('existing-pot-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('existing-pot-0')).toBeInTheDocument() // The second pot shifts to index 0
  })

  it('includes existing pots in submitted form data', () => {
    render(<PensionForm onSubmitAction={onSubmitAction} />)

    fireEvent.change(screen.getByLabelText(/Desired Retirement Income/i), {
      target: { value: '20000' },
    })
    fireEvent.change(screen.getByLabelText(/Employer Monthly Contribution/i), {
      target: { value: '300' },
    })
    fireEvent.change(screen.getByLabelText(/Personal Monthly Contribution/i), {
      target: { value: '250' },
    })
    fireEvent.change(screen.getByLabelText(/retirement age/i), {
      target: { value: '65' },
    })

    const addButton = screen.getByRole('button', {
      name: /\+ Add Pension Pot/i,
    })
    fireEvent.click(addButton)
    fireEvent.click(addButton)

    fireEvent.change(screen.getByTestId('existing-pot-0'), {
      target: { value: '1000' },
    })
    fireEvent.change(screen.getByTestId('existing-pot-1'), {
      target: { value: '2000' },
    })

    fireEvent.change(screen.getByLabelText(/Desired Retirement Income/i), {
      target: { value: '15000' },
    })

    const submit = screen.getByRole('button', { name: /calculate/i })
    fireEvent.click(submit)

    expect(onSubmitAction).toHaveBeenCalledWith(
      expect.objectContaining({
        existingPots: [1000, 2000],
        desiredIncome: 15000,
      }),
    )
  })
})
