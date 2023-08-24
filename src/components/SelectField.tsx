'use client'

import { useEffect, useState } from 'react'

export default function SelectField({
  isRequired = false,
  name,
  label,
  placeholder,
  options,
  className,
  errorMessage,
  onResetError,
}: {
  isRequired?:boolean
  name: string
  label: string
  placeholder?: string
  options: { value: string; label: string; }[]
  className?: string
  errorMessage?: string
  onResetError?: () => void
}) {
  const [value, setValue] = useState<string | undefined>()

  useEffect(() => {
    if (errorMessage) setValue('Error')
  }, [errorMessage])

  return (
    <div className={`${errorMessage ? 'error-field' : ''} ${className}`}>
      <label htmlFor={name}>
        {isRequired && '*'}{label}
      </label>
      <select
        required={isRequired}
        name={name}
        id={name}
        value={value}
        onChange={e => {
          setValue(e.target.value)
          if (errorMessage && onResetError) {
            onResetError()
          }
        }}
      >
        {errorMessage && (
          <option value="Error">
            {errorMessage}
          </option>
        )}
        {placeholder && (
          <option value="Default">
            {placeholder}
          </option>
        )}
        {options.map(item=> (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}