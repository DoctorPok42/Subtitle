import SubtitleType from '../../types/subtitle'
import styles from './styles.module.scss'

interface SubtitleProps {
    subTitle: SubtitleType[] | null
}

const Subtitle = ({ subTitle }: SubtitleProps) => {
    return (
        <div className={styles.subtitle}>
            {
                subTitle  && subTitle.map((item) => (
                    <div key={item.id} className={styles.subtitleItem}>
                        <p>{item.id}</p>
                        <p>{item.date}</p>
                        <p>{item.text}</p>
                        <p></p>
                    </div>
                ))
            }
        </div>
    )
}

export default Subtitle
