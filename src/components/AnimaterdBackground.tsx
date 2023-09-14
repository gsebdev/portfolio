import IrregularCircle from '../assets/img/irregular-circle.svg'
import styles from './animated-background.module.scss'

interface AnimatedBackgroundProps {
    positionNumber: number
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> =  ({positionNumber}) => {
   
    return (
        <div className={`${styles.background} ${styles[`position${positionNumber}`]}`}>
            <IrregularCircle className={styles.element1 + ' ' + styles.element} />
            <IrregularCircle className={styles.element2 + ' ' + styles.element} />
        </div>
    )
}

export default AnimatedBackground