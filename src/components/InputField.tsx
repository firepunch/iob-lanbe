'use client'

import { useEffect, useState } from 'react'
import { Select } from './Select'

interface IInputField {
  readOnly?: boolean
  isRequired?: boolean
  type?: 'text' | 'email' | 'password'
  name: string
  label: string
  defaultValue?: string
  placeholder?: string
  description?: string
  className?: string
  errorMessage?: string
  onResetError?: () => void
}

export default function InputField({
  readOnly = false,
  isRequired = false,
  type = 'text',
  name,
  label,
  defaultValue,
  placeholder = '',
  description,
  className,
  errorMessage,
  onResetError,
}: IInputField) {
  const [inputVal, setInputVal] = useState<string | undefined>()

  useEffect(() => {
    if (defaultValue) setInputVal(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (errorMessage) setInputVal(errorMessage)
  }, [errorMessage])

  return (
    <div className={`field ${errorMessage ? 'error-field' : ''} ${className ? className : ''}`}>
      <label htmlFor={name}>
        {isRequired && '*'}{label}
      </label>
      <input 
        readOnly={readOnly}
        required={isRequired}
        type={errorMessage ? 'text' : type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
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