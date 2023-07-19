import cls from 'classnames'
import styles from './index.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'full';
  children: string;
}

export default function Button ({
  primary = false,
  size = 'medium',
  backgroundColor,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cls(styles.button, styles[size])}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </button>
  )
}
