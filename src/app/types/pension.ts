export interface PensionInputs {
  desiredIncome: number
  employerContribution: number
  personalContribution: number
  retirementAge: number
  startAge?: number
  existingPots?: number[]
}
