
import React, { useState, useRef, useEffect, useCallback, useMemo, ReactHTMLElement, ReactElement } from 'react'
import styles from './carousel.module.scss'
import Image from 'next/image';

interface CarouselProps {
    images: string[],
    autoScroll?: Boolean,
    onClick?: (i: number) => void
}

const Carousel: React.FC<CarouselProps> = ({ images, autoScroll = false, onClick }) => {
    const [activeIndex, setActiveIndex] = useState(1)
    const isMouseDown = useRef<Boolean>(false)
    const isMouseEnter = useRef<Boolean>(false)
    const mouseDownPosition = useRef<{x: number, y: number} | null>(null)
    const lastMouseMovePosition = useRef<{ x: number, time: number } | null>(null)
    const mouseSpeed = useRef<number>(0)
    const carouselRef = useRef<HTMLUListElement | null>(null)
    const carouselChildrenRef = useRef<HTMLElement[] | null>(null)
    const autoScrollDirection = useRef<'left' | 'right'>('left')

    const scrollToIndex = useCallback((index: number) => {
        if (carouselRef.current) {
            const { scrollLeft, children, clientWidth } = carouselRef.current
            const elementWidth = children[index].clientWidth
            const scrollDelta = (children[index] as HTMLElement).offsetLeft - (clientWidth / 2) - scrollLeft + (elementWidth / 2)
            carouselRef.current.scrollBy({
                top: 0,
                left: scrollDelta,
                behavior: 'smooth'
            })
        }
    }, [])

    const getSnapItemIndex = useCallback(() => {
        if (carouselChildrenRef.current && carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current
            const childrenDistancesFromMiddle = carouselChildrenRef.current.map((child) => {
                return child.offsetLeft - scrollLeft - (clientWidth / 2)
            })
            let closestIndex = 0
            for (let i = 1; i < childrenDistancesFromMiddle.length; i++) {
                if (Math.abs(childrenDistancesFromMiddle[i]) < Math.abs(childrenDistancesFromMiddle[closestIndex])) closestIndex = i
            }
            const gap = Math.abs(mouseSpeed.current) > 0.6 ? 1 : 0
            const newIndex = Math.sign(mouseSpeed.current) < 0 ? Math.min(closestIndex + gap, images.length - 1) : Math.max((closestIndex - gap), 0)
            return newIndex
        }
        return 0
    }, [images.length])

    useEffect(() => {
        if (carouselRef.current) {
            carouselChildrenRef.current = Array.from(carouselRef.current.children) as HTMLElement[]
        }
    }, [])

    useEffect(() => {
        scrollToIndex(activeIndex)
    }, [activeIndex, scrollToIndex])

    useEffect(() => {
        if (autoScroll) {
            const autoscrollTimeout = setInterval(() => {
                setActiveIndex(i => {
                    if(isMouseEnter.current) return i
                    let nextIndex = i
                    if (i <= 0) autoScrollDirection.current = 'left'
                    if (i >= images.length - 1) autoScrollDirection.current = 'right'
                    if (autoScrollDirection.current === 'left') nextIndex = i + 1
                    if (autoScrollDirection.current === 'right') nextIndex = i - 1
                    return nextIndex
                })
            }, 3000)
            return () => {
                clearInterval(autoscrollTimeout)
            }
        }
    }, [images.length, autoScroll])

    const handelMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        mouseDownPosition.current = {
            x: e.clientX,
            y: e.clientY
        }
        lastMouseMovePosition.current = {
            x: e.clientX,
            time: e.timeStamp
        }

        isMouseDown.current = true
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (isMouseDown.current) {
            e.preventDefault()
            if (carouselRef.current && lastMouseMovePosition.current) {
                const deltaX = e.clientX - lastMouseMovePosition.current.x
                if (!isNaN(deltaX)) {
                    carouselRef.current.scrollLeft -= deltaX
                }
                mouseSpeed.current = deltaX / (e.timeStamp - lastMouseMovePosition.current.time)
                lastMouseMovePosition.current.x = e.clientX
                lastMouseMovePosition.current.time = e.timeStamp
            }
        }
    }, [])

    const handleMouseUp = useCallback((e: React.MouseEvent<HTMLElement>) => {
        isMouseDown.current = false
        e.preventDefault()       
        if (lastMouseMovePosition.current) {
            const snapIndex = getSnapItemIndex()
            setActiveIndex(i => {
                if (i === snapIndex) scrollToIndex(snapIndex)
                return snapIndex
            })
        }
        mouseSpeed.current = 0
        lastMouseMovePosition.current = null
    }, [getSnapItemIndex, scrollToIndex])

    const handleMouseEnter = useCallback(() => {
        isMouseDown.current = false
        isMouseEnter.current = true
    }, [])

    const handleMouseLeave = useCallback(() => {
        isMouseDown.current = false
        isMouseEnter.current = false
        if (lastMouseMovePosition.current) {
            const snapIndex = getSnapItemIndex()
            setActiveIndex(i => {
                if (i === snapIndex) scrollToIndex(snapIndex)
                return snapIndex
            })
        }
        mouseSpeed.current = 0
        lastMouseMovePosition.current = null
    }, [getSnapItemIndex, scrollToIndex])

    return (
        <div className={styles['carousel-container']}

            onMouseUp={handleMouseUp}
            onMouseDown={handelMouseDown}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <ul
                className={styles.carousel}
                ref={carouselRef}
            >
                {images.map((image, index) => (
                    <li 
                        className={`${styles.item} ${activeIndex === index ? styles.active : ''}`} 
                        key={'carousel456478645' + index}
                        onMouseUp={e => {
                            e.preventDefault()
                            if(mouseDownPosition.current && onClick) {
                                const deltaY = Math.abs(mouseDownPosition.current.y - e.clientY)
                                const deltaX = Math.abs(mouseDownPosition.current.x - e.clientX)
                                if(deltaX < 8 && deltaY < 8) onClick(index)
                            }
                            
                        }}
                    >
                        <Image
                            fill={true}
                            src={image}
                            alt={`slide ${index + 1}`}
                        />
                        <div className={styles.description}>
                            <button>Voir plus</button>
                            <h3>Une description courte</h3>
                        </div>
                    </li>

                ))}
            </ul>
        </div>

    )
}

export default Carousel;