import { useMemo } from 'react'
import styles from './timeline.module.scss'
import { useState } from 'react'

interface TimeLineElement {
    color?: string | undefined
    title: string
    content: string | undefined
    time: string

}

interface TimeLineProps {
    timelineElements: TimeLineElement[]
}

const TimeLine: React.FC<TimeLineProps> = ({ timelineElements }) => {

    const elementWidthPercent = useMemo(() => 100 / timelineElements.length, [timelineElements])

    return (
        <ul className={styles.timeline}>
            {
                timelineElements.map(({ color = 'white', title, content, time }, index) => {

                    const reverse = index % 2 === 0 ? true : false

                    return (
                        <li 
                            key={index + title + 'timeline123456789'}
                            className={`${styles.element} ${reverse ? styles.reverse : ''}`}
                            style={{ 
                                width: `${elementWidthPercent}%`,
                                opacity: `${1 - ((timelineElements.length - index) * (0.6 / timelineElements.length))}`
                            }}
                        >
                            <div className={styles.text}>
                                <h3 className={styles.title}>{title}</h3>
                                <p className={styles.time}>{time}</p>
                            </div>
                            <p className={styles.content}>{content}</p>
                            <div className={styles.arrow} style={{ background: color }}></div>
                            <span className={styles.line}></span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default TimeLine