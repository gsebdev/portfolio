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

    //calc element width function of length of elements
    const elementWidthPercent = useMemo(() => 100 / timelineElements.length, [timelineElements])

    // function to get the opacity value function of index position and legnth to make a gradient
    const getOpacity = useCallback((index: number) => 1 - ((timelineElements.length - index) * (0.6 / timelineElements.length)), [timelineElements])

    return (
        <ul
            className={styles.timeline}
            onBlur={() => { setActiveElement(null) }}
            onMouseLeave={() => { setActiveElement(null) }}
        >
            {
                timelineElements.map(({ color = 'white', title, content, time }, index) => {

                    const reverse = index % 2 === 0 ? true : false

                    return (
                        <li
                            tabIndex={0}
                            key={index + title + 'timeline123456789'}
                            className={`${styles.element} ${reverse ? styles.reverse : ''} ${activeElement === index ? styles.active : ''}`}
                            style={{
                                width: `${elementWidthPercent}%`,
                                opacity: `${activeElement === null ? getOpacity(index) : activeElement === index ? '1' : '0.2'}`
                            }}
                            onMouseOver={() => { setActiveElement(index) }}
                            onFocus={() => { setActiveElement(index) }}
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