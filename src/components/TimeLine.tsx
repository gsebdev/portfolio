'use client'

import { useMemo } from 'react'
import styles from './timeline.module.scss'


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
                        <li key={index + title + 'timeline123456789'}
                            className={`${styles.element} ${reverse ? styles.reverse : ''}`}
                            style={{ width: `${elementWidthPercent}%` }}
                        >
                            <div className={styles.text}>

                                <div>
                                    <h3 className={styles.title}>{title}</h3>
                                    <p className={styles.content}>{content}</p>
                                </div>
                                <p className={styles.time}>{time}</p>

                            </div>


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