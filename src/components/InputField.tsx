'use client'

import { useEffect, useState } from 'react'
import { Select } from './Select'

export default function InputField({
  isRequired = false,
  type = 'text',
  name,
  label,
  placeholder = '',
  description,
  className,
  errorMessage,
  onResetError,
}: {
  isRequired?:boolean
  type?: 'text' | 'email' | 'password'
  name: string
  label: string
  placeholder?: string
  description?: string
  className?: string
  errorMessage?: string
  onResetError?: () => void
}) {
  const [inputVal, setInputVal] = useState<string | undefined>()

  useEffect(() => {
    if (errorMessage) setInputVal(errorMessage)
  }, [errorMessage])

  return (
    <div className={`field ${errorMessage ? 'error-field' : ''} ${className ? className : ''}`}>
      <label htmlFor={name}>
        {isRequired && '*'}{label}
      </label>
      <input 
        required={isRequired}
        type={errorMessage ? 'text' : type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={inputVal}
        onChange={e => {
          if (errorMessage && onResetError) {
            setInputVal(String(e.eventPhase))
            onResetError()
          } else {
            setInputVal(e.target.value)
          }
        }}
      />
      {description && <p>{description}</p>}
    </div>
  )
}