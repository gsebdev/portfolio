import styles from './verticalNav.module.scss'

export default function VerticalNav({ items, callback, position }: { items: string[], callback: (i: number) => void, position: number }) {
    return (
        <div className={styles.container}>
            {
                items.map((item, index) => {
                    return <div 
                                key={'veticalNav' + index + item} 
                                className={`${styles.item} ${position === index ? styles.active : ''}`}
                                onClick={() => {callback(index)}}
                                >
                                </div>
                })
            }
        </div>
    )
}