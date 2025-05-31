'use client'

import { useState } from 'react'
import { PensionInputs } from '@/app/types/pension'
import TextInput from './TextInput'
import Button from './Button'

interface Props {
  onSubmitAction: (data: PensionInputs) => void
}

export default function PensionForm({ onSubmitAction }: Props) {
  const [formData, setFormData] = useState<PensionInputs>({
    desiredIncome: 0,
    employerContribution: 0,
    personalContribution: 0,
    retirementAge: 0,
    startAge: 25,
    existingPots: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const handlePotChange = (index: number, value: string) => {
    const pots = [...(formData.existingPots || [])]
    pots[index] = Number(value)
    setFormData((prev) => ({ ...prev, existingPots: pots }))
  }

  const addPot = () => {
    setFormData((prev) => ({
      ...prev,
      existingPots: [...(prev.existingPots || []), 0],
    }))
  }

  const removePot = (index: number) => {
    const pots = [...(formData.existingPots || [])]
    pots.splice(index, 1)
    setFormData((prev) => ({ ...prev, existingPots: pots }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmitAction(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded shadow-md w-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold">
        Pension Setup
        <span className="block text-sm"> * required fields</span>
      </h2>

      <TextInput
        label="Desired Retirement Income (£/year)"
        value={formData.desiredIncome}
        type="number"
        name="desiredIncome"
        onChange={handleChange}
      />

      <TextInput
        label="Employer Monthly Contribution (£)"
        type="number"
        name="employerContribution"
        value={formData.employerContribution}
        onChange={handleChange}
      />

      <TextInput
        label="Personal Monthly Contribution (£)"
        type="number"
        name="personalContribution"
        value={formData.personalContribution}
        onChange={handleChange}
      />

      <TextInput
        label="Desired Retirement Age"
        type="number"
        name="retirementAge"
        value={formData.retirementAge}
        onChange={handleChange}
      />

      <TextInput
        label="Start Age"
        type="number"
        name="startAge"
        value={formData.startAge}
        onChange={handleChange}
        required={false} // Optional field. default age is 25
        placeholder="Default is 25"
      />

      <div className="w-full">
        <label className="block font-semibold">Existing Pension Pots</label>
        {formData.existingPots?.map((amount, index) => (
          <div key={index} className="flex gap-2 items-center mb-4 mt-4">
            <TextInput
              type="number"
              name={`existingPots-${index}`}
              value={amount}
              data-testid={`existing-pot-${index}`}
              onChange={(e) => handlePotChange(index, e.target.value)}
              required={false} // Optional field. default age is 25
            />
            <Button
              data-testid={`existing-pot-${index}-remove`}
              variant="remove"
              onClick={() => removePot(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button variant="add" onClick={addPot}>
          + Add Pension Pot
        </Button>
      </div>

      <Button type="submit">Calculate</Button>
    </form>
  )
}
