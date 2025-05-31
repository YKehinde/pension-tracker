import { PensionInputs } from '@/app/types/pension'

const LIFE_EXPECTANCY = 81
const START_AGE = 25
const INTEREST_RATE = 0.049 // 4.9%

export interface PensionProjection {
  yearsUntilRetirement: number
  projectedPot: number
  requiredPot: number
  contributionsPerYear: number
}

export function calculatePension({
  desiredIncome,
  employerContribution,
  personalContribution,
  retirementAge,
}: PensionInputs): PensionProjection {
  const yearsUntilRetirement = retirementAge - START_AGE
  const retirementYears = LIFE_EXPECTANCY - retirementAge
  const totalMonthlyContribution = employerContribution + personalContribution
  const annualContribution = totalMonthlyContribution * 12

  // Compound interest formula: FV = P * [(1 + r)^n - 1] / r
  const projectedPot =
    annualContribution *
    ((Math.pow(1 + INTEREST_RATE, yearsUntilRetirement) - 1) / INTEREST_RATE)

  // How much money do they need to withdraw annually for X years
  // PV of withdrawals = PMT * [1 - (1 + r)^-n] / r
  const requiredPot =
    desiredIncome *
    ((1 - Math.pow(1 + INTEREST_RATE, -retirementYears)) / INTEREST_RATE)

  return {
    yearsUntilRetirement,
    projectedPot,
    requiredPot,
    contributionsPerYear: annualContribution,
  }
}
