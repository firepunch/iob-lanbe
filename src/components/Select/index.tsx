import { Option, Options } from '@/types'

interface SelectProps {
  isRequired?: boolean
  name: string
  id: string
  defaultOption?: Option
  options: Options
  errorMessage?: string
  onChange?: (value: string) => void
}

export const Select = ({
  isRequired = false,
  name,
  id,
  defaultOption,
  options = [],
  errorMessage,
  onChange,
}: SelectProps) => (
  <select
    required={isRequired}
    name={name}
    id={id}
    {...onChange && { onChange: (e) => onChange(e.target.value)  }}
  >
    {errorMessage && (
      <option value="Error">
        {errorMessage}
      </option>
    )}
    {defaultOption && (
      <option value={defaultOption.value}>
        {defaultOption.label}
      </option>
    )}
    {options.map(item=> (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
)