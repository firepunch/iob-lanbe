import styles from '@/styles/Button.module.scss'

export default function Button({ children }) {
  return (
    <button className={styles.button}>{children}</button>
  )
}
