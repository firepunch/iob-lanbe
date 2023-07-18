import cls from 'classnames'
import styles from './index.module.scss'

interface ReportCardProps {
  thumbnail?: {sourceUrl:string; altText:string};
  title?: string;
  description?: string;
  onClick?: () => void;
  onSave?: () => void;
}

export const ReportCard = ({
  thumbnail,
  title = '',
  description = '',
  onClick,
  onSave,
  ...props
}: ReportCardProps) => {
  return (
    <div className={styles.card}>
      {thumbnail ? 
        <img src={thumbnail.sourceUrl} alt={thumbnail.altText} /> :
        <img src="https://via.placeholder.com/200" alt="thumbnail" />
      }
      <p>{title}</p>
      <p>{description}</p>
    </div>
  )
}
