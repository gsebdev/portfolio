
import { ChangeEvent, FormEvent, KeyboardEventHandler, useCallback, useEffect, useReducer } from 'react'
import styles from './contact-form.module.scss'
import SendIcon from '../assets/img/send.svg'

interface Record {
    name: string,
    question: string,
    answer?: string
}
interface ContactFormProps {
    entries: Record[]
}

interface chatHistoryState {
    activeStep: number,
    entries: Record[],
    inactiveInput: Boolean
}
interface chatHistoryAction {
    type: string,
    value?: string
}

const chatHistoryReducer = (state: chatHistoryState, action: chatHistoryAction) => {
    switch (action.type) {
        case 'SET_INACTIVE': {
            return {
                ...state,
                inactiveInput: true
            }
        }
        case 'SET_ACTIVE': {
            return {
                ...state,
                inactiveInput: false
            }
        }
        case 'NEXT_STEP': {
            const data = { ...state }
            if (state.activeStep < state.entries.length) data.activeStep = state.activeStep + 1
            data.inactiveInput = data.activeStep >= state.entries.length ? true : false
            return data
        }
        case 'UPDATE_ANSWER': {
            if (state.activeStep < state.entries.length) {
                const data = [...state.entries]
                if (action.value) data[state.activeStep] = {
                    ...data[state.activeStep],
                    answer: action.value
                }
                return {
                    ...state,
                    entries: data
                }
            }
            return state
        }
        default: throw Error('Action non reconnue' + action.type)
    }
}

const ContactForm: React.FC<ContactFormProps> = ({ entries }) => {
    const [chatHistory, dispatch] = useReducer(chatHistoryReducer, {
        activeStep: 0,
        entries: entries,
        inactiveInput: false
    })
    const adjustInputHeight = useCallback((el: HTMLTextAreaElement) => {
        el.style.height = 'auto'
        const inputHeight = el.scrollHeight +20
        el.style.height = inputHeight + 'px'
    }, [])

    const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({
            type: 'UPDATE_ANSWER',
            value: e.target.value
        })
       adjustInputHeight(e.target)
    }, [adjustInputHeight])

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({
            type: 'NEXT_STEP',
        })
    }, [])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        console.log(e)
        if (e.key === 'Enter') {
            if (e.ctrlKey) {
                dispatch({
                    type: 'UPDATE_ANSWER',
                    value: e.currentTarget.value + '\n'
                })
               adjustInputHeight(e.currentTarget)
            } else {
                e.preventDefault()
                dispatch({
                    type: 'NEXT_STEP',
                })
            }
        }
    }, [adjustInputHeight])
    console.log(chatHistory)
    return (
        <div className={styles['contact-form-container']}>
            <div className={styles['chat-container']}>
                {chatHistory.entries.slice(0, chatHistory.activeStep + 1).map((record, index) => {
                    chatHistory.entries.slice(0, chatHistory.activeStep + 1)
                    return (
                        <div
                            className={styles['record-container']}
                            id={record.name} key={index.toString() + record + 'contactformchat'}
                        >
                            <span className={styles.question}>
                                {record.question}
                            </span>
                            {index < chatHistory.activeStep && record.answer &&
                                <span className={styles.answer}>
                                    {record.answer}
                                </span>
                            }
                        </div>
                    )
                })}
            </div>
            <form className={`${styles['answer-form']} ${chatHistory.inactiveInput ? styles.inactive : ''}`} onSubmit={handleSubmit}>
                <textarea readOnly={chatHistory.inactiveInput ? true : false} onKeyDown={handleKeyDown} onChange={handleInputChange} value={chatHistory.entries[chatHistory.activeStep]?.answer ?? ''} />
                <button aria-label='Envoyer'>
                    <SendIcon />
                </button>
            </form>
        </div>

    )
}

export default ContactForm