import cls from 'classnames'
import styles from './index.module.scss'

interface SelectProps {
  name: string
  id: string
  options: { value: string; label: string; }[];
  onChange?: () => void;
}

export const Select = ({
  options = [],
  ...props
}: SelectProps) => (
  <select
    className={cls(styles.select)}
    {...props}
  >
    {options.map(item=> (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
)