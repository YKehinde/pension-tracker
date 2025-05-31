'use client'

import { useState } from 'react'
import { PensionInputs } from '@/app/types/pension'
import TextInput from './TextInput'
import Button from './Button'

interface Props {
  onSubmit: (data: PensionInputs) => void
}

export default function PensionForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<PensionInputs>({
    desiredIncome: 0,
    employerContribution: 0,
    personalContribution: 0,
    retirementAge: 0,
    startAge: 25, // Default start age
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded shadow-md max-w-md mx-auto"
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
        required={false} // Optional field
        placeholder="Default is 25"
      />

      <Button type="submit">Calculate</Button>
    </form>
  )
}
