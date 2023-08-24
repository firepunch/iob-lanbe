'use client'

import { error } from 'console'
import { useEffect, useState } from 'react'

export default function Field({
  isRequired = false,
  type = 'text',
  name,
  label,
  placeholder = '',
  description,
  className,
  errorMessage,
  onChangeInput,
}: {
  isRequired?:boolean
  type?: 'text' | 'email' | 'password' | 'select'
  name: string
  label: string
  placeholder?: string
  description?: string
  className?: string
  errorMessage?: string
  onChangeInput?: () => void
}) {
  const [inputVal, setInputVal] = useState<string | undefined>()

  useEffect(() => {
    if (errorMessage) setInputVal(errorMessage)
  }, [errorMessage])

  return (
    <>
      {type === 'select' ? (
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
              if (errorMessage && onChangeInput) {
                setInputVal(String(e.eventPhase))
                onChangeInput()
              } else {
                setInputVal(e.target.value)
              }
            }}
          />
          {description && <p>{description}</p>}
        </div>
      ) : (
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
              if (errorMessage && onChangeInput) {
                setInputVal(String(e.eventPhase))
                onChangeInput()
              } else {
                setInputVal(e.target.value)
              }
            }}
          />
          {description && <p>{description}</p>}
        </div>
      )}
    </>
  )
}