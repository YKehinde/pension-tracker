'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  data: { age: number; pot: number }[]
}

export default function DrawdownChart({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl mb-4">
      <h3 className="text-lg font-semibold mb-2 text-black">
        Post-Retirement Drawdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="age"
            label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis tickFormatter={(v) => `£${v.toLocaleString()}`} />
          <Tooltip
            formatter={(value: number) => `£${value.toLocaleString()}`}
          />
          <Line
            type="monotone"
            dataKey="pot"
            stroke="#dc2626"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
