'use client'
import { useState } from 'react'
import PensionForm from './components/PensionForm'
import { calculatePension, PensionProjection } from './lib/pensionCalculator'
import type { PensionInputs } from './types/pension'
import GrowthChart from './components/charts/GrowthChart'
import { getGrowthData } from './lib/pensionGrowth'
import DrawdownChart from './components/charts/DrawdownChart'
import { getDrawdownData } from './lib/pensionDrawdown'

export default function Home() {
  const [result, setResult] = useState<PensionProjection | null>(null)
  const [growthData, setGrowthData] = useState<{ age: number; pot: number }[]>(
    [],
  )
  const [drawdownData, setDrawdownData] = useState<
    { age: number; pot: number }[]
  >([])

  const handleFormSubmit = (data: PensionInputs) => {
    const output = calculatePension(data)
    setResult(output)

    const growth = getGrowthData(
      output.contributionsPerYear,
      output.yearsUntilRetirement,
      0.049,
      data.existingPots || [],
      data.startAge ?? 25,
    )

    const drawdown = getDrawdownData(
      output.projectedPot,
      data.desiredIncome,
      81 - data.retirementAge,
      0.049,
      data.retirementAge,
    )

    setGrowthData(growth)
    setDrawdownData(drawdown)
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold mb-8">Pension Tracker</h1>
      <div className="flex flex-row w-full sm:flex-col md:flex-col lg:flex-row gap-8 sm:gap-16 lg:gap-32">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-1/3">
          <PensionForm
            onSubmitAction={handleFormSubmit}
            onClearData={() => {
              setResult(null), setGrowthData([])
              setDrawdownData([])
            }}
          />
        </main>
        <aside className="text-sm w-2/3">
          {result && (
            <section className="p-4 rounded shadow max-w-md mb-4">
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
          {growthData.length > 0 && <GrowthChart data={growthData} />}
          {drawdownData.length > 0 && <DrawdownChart data={drawdownData} />}
        </aside>
      </div>
    </div>
  )
}
