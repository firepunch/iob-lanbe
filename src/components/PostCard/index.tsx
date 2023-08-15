import cls from 'classnames'
import styles from './index.module.scss'

interface PostCardProps {
  thumbnail?: {sourceUrl:string; altText:string};
  title?: string;
  description?: string;
  onClick?: () => void;
  onSave?: () => void;
}

export const PostCard = ({
  thumbnail,
  title = '',
  description = '',
  onClick,
  onSave,
  ...props
}: PostCardProps) => {
  return (
    <>
      <div className="indiv-content i-c-1">
        <div className="thumbnail">
          <div className="save">
            <img src="./imgs/save.png" alt="Save"/>
          </div>
        </div>

        <div className="location-date">
          <div className="country">
            <img src="./imgs/locationicon_black.png" alt="Location icon"/>
            <p>COUNTRY</p>
          </div>

          <p className="date">23.07.25</p>
        </div>

        <a href="#" className="indiv-content-title">
                        Title sample: Product Placement Strategy Revived a 35 year-old Shoe Brand
        </a>

        <div className="tags">
          <div className="indiv-tag">Tag</div>
          <div className="indiv-tag">Long Tag</div>
        </div>
      </div>

      <div className={styles.card}>
        {thumbnail ? 
          <img src={thumbnail.sourceUrl} alt={thumbnail.altText} /> :
          <img src="https://via.placeholder.com/200" alt="thumbnail" />
        }
        <p>{title}</p>
        <p>{description}</p>
      </div>

    </>
  )
}
