'use client'
import { useCallback, useMemo } from 'react'
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
    const [activeElement, setActiveElement] = useState<number | null>(null)

    // function to get the opacity value function of index position and legnth to make a gradient
    const getOpacity = useCallback((index: number) => 0.6 - (index * 0.8 / timelineElements.length), [timelineElements])

    return (
        <ul
            className={styles.timeline}
            onBlur={() => { setActiveElement(null) }}
            onMouseLeave={() => { setActiveElement(null) }}
        >
            {
                timelineElements.map(({ title, content, time }, index) => {

                    const reverse = index % 2 === 0 ? true : false

                    return (
                        <li
                            tabIndex={0}
                            key={index + title + 'timeline123456789'}
                            className={`${styles.element} ${reverse ? styles.reverse : ''} ${activeElement === index ? styles.active : ''}`}
                            onMouseOver={() => { setActiveElement(index) }}
                            onFocus={() => { setActiveElement(index) }}
                        >
                            <p className={styles.time}>{time}</p>
                            <h3 className={styles.title}>{title}</h3>
                            <p className={styles.content}>{content}</p>
                            <div 
                                className={styles.opacityMask}
                                style={{
                                    opacity: `${activeElement === null ? getOpacity(index) : activeElement === index ? '0' : '0.8'}`
                                }}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default TimeLine