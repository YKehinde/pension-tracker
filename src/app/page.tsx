'use client'
import { useState } from 'react'
import PensionForm from './components/PensionForm'
import { calculatePension, PensionProjection } from './lib/pensionCalculator'
import type { PensionInputs } from './types/pension'

export default function Home() {
  const [result, setResult] = useState<PensionProjection | null>(null)

  const handleFormSubmit = (data: PensionInputs) => {
    const output = calculatePension(data)
    setResult(output)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Pension Tracker</h1>

        <PensionForm onSubmitAction={handleFormSubmit} />

        {result && (
          <section className="p-4 rounded shadow max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-2">Results</h2>
            <p>
              Projected Pension Pot: £
              {result.projectedPot.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p>
              Required Pot to Retire Comfortably: £
              {result.requiredPot.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p>Years until retirement: {result.yearsUntilRetirement}</p>
          </section>
        )}
      </main>
    </div>
  )
}
