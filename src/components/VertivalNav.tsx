import styles from './verticalNav.module.scss'
interface VerticalNavProps {
    items: string[]
    callback: (i: number) => void
    position: number
    invertedColors: true | false
}

const VerticalNav: React.FC<VerticalNavProps> = ({ items, callback, position, invertedColors = false }) => {
    return (
        <div className={`${styles.container}`}>
            {
                items.map((item, index) => {
                    return <div 
                                key={'veticalNav' + index + item} 
                                className={`${styles.item} ${position === index ? styles.active : ''} ${invertedColors ? styles.inverted : ''}`}
                                onClick={() => {callback(index)}}
                                >
                                </div>
                })
            }
        </div>
    )
}

export default VerticalNav