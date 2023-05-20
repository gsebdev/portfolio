import styles from './twoColorsBackground.module.scss'

export default function TwoColorsBackground({position = 0}: {position?: number}) {
    
    return (
        <div className={styles.background}>
            <div style={{transform: `scaleX(${position})`}}></div>
        </div>
    )
}