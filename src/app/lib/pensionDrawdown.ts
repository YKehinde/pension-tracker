export function getDrawdownData(
  startingPot: number,
  annualWithdrawal: number,
  retirementYears: number,
  interestRate: number,
  retirementAge: number,
): { age: number; pot: number }[] {
  const data = []
  let pot = startingPot

  for (let i = 0; i < retirementYears; i++) {
    const age = retirementAge + i
    pot = (pot - annualWithdrawal) * (1 + interestRate)
    data.push({ age, pot: Math.max(0, Math.round(pot)) })
    if (pot <= 0) break
  }

  return data
}
