import cls from 'classnames'
import styles from './index.module.scss'

interface ContentCardProps {
  thumbnail_url?: string;
  postCountry?: { lanbeCountry?: string };
  date?: string;
  title?: string;
  tags?: string[];
  onClick?: () => void;
  onSave?: () => void;
}

export const ContentCard = ({
  thumbnail_url,
  postCountry = {},
  date = '',
  title = '',
  tags = [],
  onClick,
  onSave,
  ...props
}: ContentCardProps) => {
  return (
    <div className={styles.card}>
      {thumbnail_url ? 
        <img src={thumbnail_url} alt="thumbnail" /> :
        <img src="https://via.placeholder.com/200" alt="thumbnail" />
      }
      <div>
        <span>{postCountry?.lanbeCountry}</span>
        <span>{date}</span>
      </div>
      <p>{title}</p>
      {tags.map(item=> (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}
