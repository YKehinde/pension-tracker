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
  required?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  name,
  id,
  placeholder,
  onChange,
  required = true,
  ...props
}) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    // Call any user-provided onFocus
    if (props.onFocus) props.onFocus(e)
  }

  return (
    <div className="mb-4 mt-4 block">
      {label && (
        <label className="mb-2 block" htmlFor={name}>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <input
        {...props}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`p-2 w-full rounded border-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onChange={onChange}
        onFocus={handleFocus}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}

export default TextInput
