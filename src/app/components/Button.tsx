import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'remove' | 'add'
  type?: 'button' | 'submit' | 'reset'
}

const baseStyles =
  'px-4 py-2 rounded font-medium focus:outline-none transition-colors'
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 mx-4',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  remove: 'text-red-500 hover:underline',
  add: 'text-blue-600 hover:underline',
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
