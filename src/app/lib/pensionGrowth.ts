export function getGrowthData(
  annualContribution: number,
  yearsUntilRetirement: number,
  interestRate: number,
  existingPots: number[],
  startAge: number,
): { age: number; pot: number }[] {
  const data = []
  let pot = existingPots.reduce((sum, val) => sum + val, 0)

  for (let i = 0; i < yearsUntilRetirement; i++) {
    const age = startAge + i
    pot = (pot + annualContribution) * (1 + interestRate)
    data.push({ age, pot: Math.round(pot) })
  }

  return data
}
