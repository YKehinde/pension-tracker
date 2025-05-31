# 🧓 Pension Tracker
A pension planning tool built with Next.js (App Router), TypeScript, Tailwind CSS, and Recharts to help users project their retirement savings and understand how their pension pot will grow and deplete over time.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📦 Tech Stack
*	Next.js (App Router) + TypeScript
*	Tailwind CSS for styling
*	Recharts for visualisations
*	Jest + React Testing Library for unit testing

## ✨ Features

### 🔢 Input Form

Users can input the following:
* Desired retirement income per year (e.g. £16,000)
* Employer monthly contribution
* Personal monthly contribution
* Age at which they plan to retire
* Existing pension pots (can add multiple)

Form is modular and built with reusable components like:
* TextInput
* Button

### 📈 Charts

1. Projected Pension Growth Chart
* Shows how the pension pot grows from age 25 until retirement
* Includes compound interest at an annual rate of 4.9%
* Accounts for existing pension pots

2. Post-Retirement Drawdown Chart
* Simulates pension pot depletion after retirement
* Withdraws user’s desired income annually
* Shows pot size from retirement age to age 81

### 🔬 Testing

Unit tests are written for:
* calculatePension logic including:
* Contribution growth
* Required pot
* Existing pots impact
* UI components:
* Button (including all variants)
* TextInput
* PensionForm (form logic, input changes, add/remove pots, form submission)

## Running
Setup and running

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Run the tests
npm run test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧠 Assumptions
* User starts working at age 25
* Lives until age 81
* Contributions grow annually at 4.9%
* Withdrawals happen yearly after retirement

## Things I could have improved
* Improve overall visual design with a consistent design system or UI library (e.g. Radix UI, Headless UI)
* Use a component library (e.g. shadcn/ui or Chakra UI) for accessible, styled UI

### Things that could be thought about to expand
* Support for variable contribution amounts or annual salary increases
* Add Playwright or Cypress tests for the entire form → chart flow
* Mock inputs and assert chart output correctness
