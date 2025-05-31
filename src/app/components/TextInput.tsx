import React, { InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name?: string
  id?: string
  error?: string
  type?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  name,
  id,
  ...props
}) => (
  <div className="mb-4 mt-4 block">
    {label && (
      <label className="mb-2 block" htmlFor={name}>
        {label}
      </label>
    )}
    <input
      {...props}
      id={name}
      name={name}
      className={`p-2 w-full rounded border-2 ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
      onChange={props.onChange}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
)

export default TextInput
