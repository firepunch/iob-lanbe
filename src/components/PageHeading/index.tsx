import cls from "classnames"
import styles from "./index.module.scss"

interface ButtonProps {
  title: string;
  description?: string;
  prefix?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function PageHeading({
  title,
  description,
  prefix,
  children,
  ...props
}: ButtonProps) {
  return (
    <header className={styles.pageHeading} {...props}>
      <div className={styles.header}>
        <div>
          {prefix && <p>{prefix}</p>}
          <h2>{title}</h2>
        </div>
        <img src="https://via.placeholder.com/16.5" alt="arrow" />
      </div>
      {children && (
        <div className={styles.children}>
          {children}
        </div>
      )}
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </header>
  )
}
