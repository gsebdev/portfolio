import { ReactNode, useEffect, useRef } from "react"
import useOutsideClick from "../hooks/useOusideClick"
import styles from './modal.module.scss'

interface ModalProps {
    visible: Boolean,
    onClose: () => void,
    children: ReactNode
}
const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
    const ref = useRef<HTMLDivElement>(null)
    // detects outside click when modal is visible, and call onClose when an outside click is detected
    useOutsideClick(ref, onClose, visible)
    
    useEffect(() => {
        if (visible) {
            const body = document.body
            const scrollBarSize = window.innerWidth > body.offsetWidth ? window.innerWidth - body.offsetWidth : null
            body.style.overflow = 'hidden'

            if (scrollBarSize) {
                body.style.paddingRight = scrollBarSize + 'px'
                return () => {
                    body.style.paddingRight = ''
                    body.style.overflow = ''
                }
            }
            return () => {
                body.style.overflow = ''
            }
        }

    }, [visible])

    return (
        <>
            {visible &&
                <div className={styles.modal}>
                    <div ref={ref} className={styles['modal__body']}>
                        <div className={styles['modal__close']} onClick={onClose} />
                        {children}
                    </div>

                </div>
            }
        </>


    )
}

export default Modal