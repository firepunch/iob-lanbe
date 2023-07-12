import styles from './index.module.scss';
import cls from 'classnames';

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'full';
  children: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cls(styles.button, styles[size])}
      style={{ backgroundColor }}
      {...props}
    >
      {children}
    </button>
  );
};
