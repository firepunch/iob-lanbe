interface SelectProps {
  isRequired?: boolean
  name: string
  id: string
  defaultOption?: { value: string; label: string; }
  options: { value: string; label: string; }[]
  onChange?: () => void
}

export const Select = ({
  isRequired = false,
  name,
  id,
  defaultOption,
  options = [],
  ...props
}: SelectProps) => (
  <select
    required={isRequired}
    name={name}
    id={id}
    {...props}
  >
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