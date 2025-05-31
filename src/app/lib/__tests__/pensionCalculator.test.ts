import { calculatePension } from '../pensionCalculator'
import type { PensionInputs } from '../../types/pension'

describe('calculatePension', () => {
  const baseInput: PensionInputs = {
    desiredIncome: 16000,
    employerContribution: 300,
    personalContribution: 200,
    retirementAge: 65,
  }

  it('calculates correct projected and required pension pots', () => {
    const result = calculatePension(baseInput)

    expect(result.yearsUntilRetirement).toBe(40)
    expect(result.contributionsPerYear).toBe(6000)

    // These values are based on known compound interest outputs
    expect(result.projectedPot).toBeGreaterThan(700000)
    expect(result.projectedPot).toBeLessThan(750000)

    expect(result.requiredPot).toBeGreaterThan(170000)
    expect(result.requiredPot).toBeLessThan(180000)
  })

  it('returns higher projected pot for larger contributions', () => {
    const input = { ...baseInput, personalContribution: 700 }
    const result = calculatePension(input)

    expect(result.projectedPot).toBeGreaterThan(1_000_000)
  })

  it('returns higher required pot for higher desired income', () => {
    const input = { ...baseInput, desiredIncome: 25000 }
    const result = calculatePension(input)

    expect(result.requiredPot).toBeGreaterThan(250000)
  })

  it('returns lower projected pot for earlier retirement', () => {
    const input = { ...baseInput, retirementAge: 55 }
    const result = calculatePension(input)

    expect(result.projectedPot).toBeLessThan(baseInput.desiredIncome * 100) // Arbitrary low threshold
  })

  it('returns zero projected pot if contributions are zero', () => {
    const input = {
      ...baseInput,
      employerContribution: 0,
      personalContribution: 0,
    }
    const result = calculatePension(input)

    expect(result.projectedPot).toBe(0)
    expect(result.contributionsPerYear).toBe(0)
  })

  it('returns zero required pot if desired income is zero', () => {
    const input = { ...baseInput, desiredIncome: 0 }
    const result = calculatePension(input)

    expect(result.requiredPot).toBe(0)
  })

  it('returns correct values for retirement at life expectancy', () => {
    const input = { ...baseInput, retirementAge: 81 }
    const result = calculatePension(input)

    expect(result.yearsUntilRetirement).toBe(56)
    expect(result.projectedPot).toBeGreaterThan(1_000_000)
    expect(result.requiredPot).toBe(0)
  })

  it('handles minimum retirement age (START_AGE)', () => {
    const input = { ...baseInput, retirementAge: 25 }
    const result = calculatePension(input)

    expect(result.yearsUntilRetirement).toBe(0)
    expect(result.projectedPot).toBe(0)
  })
})
