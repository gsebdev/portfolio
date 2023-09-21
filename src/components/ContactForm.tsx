
import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useRef } from 'react'
import styles from './contact-form.module.scss'
import SendIcon from '../assets/img/send.svg'

interface Record {
    name: string,
    question: string,
    answer?: string,
    validators?: { fn: (str: string) => Boolean, msg: string }[]
}
interface ContactFormProps {
    entries: Record[],
    initialMsg?: string,
    endMsg?: string
}

type chatHistoryState = {
    activeStep: number,
    entries: Record[],
    inactiveInput: Boolean,
    sent: Boolean,
    init: Record[]
}
type chatHistoryAction = {
    type: string,
    value?: string
}

const chatHistoryReducer = (state: chatHistoryState, action: chatHistoryAction) => {
    try {
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
            case 'SET_SENT': {
                return {
                    ...state,
                    sent: true
                }
            }
            case 'NEXT_STEP': {
                const currentRecord = state.entries[state.activeStep]
                const answer = currentRecord.answer?.replace(/\r?\n|\r/g, ' ') // removes line breaks
                // if the current answer is empty or doesn't exists
                if (!answer || /^\s+$/.test(answer)) {
                    return state
                }
                const data = { ...state }
                // validate the answer with the validators
                if (currentRecord.validators) {
                    for (const validator of currentRecord.validators) {
                        if (!validator.fn(answer)) {
                            data.entries.splice(state.activeStep + 1, 0, {
                                name: 'error',
                                question: validator.msg,
                                validators: currentRecord.validators
                            })
                            data.activeStep += 1
                            return data
                        }
                    }
                }
                // update to next step if no errors
                if (state.activeStep < state.entries.length) data.activeStep = state.activeStep + 1
                // replace [variable string] in question
                let { question } = data.entries[data.activeStep]
                const variableWords = question.match(/\[(.*?)\]/g) // get variable words
                if (variableWords) {
                    variableWords.forEach((variableWord) => { // replace all variable words
                        const word = data.entries.find((record) => record.name === variableWord.slice(1, -1))?.answer ?? ''
                        question = question.replace(variableWord, word.replace(/\r?\n|\n/g, ''))
                    })
                    data.entries[data.activeStep].question = question
                }
                // set inative input if last message
                data.inactiveInput = data.activeStep >= state.entries.length
                // need to continue work to send it....
                data.sent = data.activeStep >= state.entries.length
                return data
            }
            case 'UPDATE_ANSWER': {
                if (state.activeStep < state.entries.length) {
                    const data = [...state.entries]
                    if (action.value !== null && action.value !== undefined) data[state.activeStep] = {
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
            case 'RESET': {
                return {
                    activeStep: 0,
                    entries: state.init,
                    inactiveInput: false,
                    sent: false,
                    init: state.init
                }
            }
            default: throw Error('Unknown action type: ' + action.type)
        }
    } catch (error) {
        console.error('Error when tried to update the chat history', error)
        return state
    }
    
}

const ContactForm: React.FC<ContactFormProps> = ({ entries, initialMsg, endMsg }) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null) // Reference to the textarea element
    const [chatHistory, dispatch] = useReducer(chatHistoryReducer, { // State management for chat history
        activeStep: 0,
        entries: entries,
        inactiveInput: false,
        sent: false,
        init: entries
    })

    const adjustInputHeight = useCallback(() => { // Function to adjust the height of the textarea
        const el = inputRef.current
        if (el) {
            el.style.height = 'auto'
            const inputHeight = el.scrollHeight + 20
            el.style.height = inputHeight + 'px'
        }
    }, [])

    useEffect(() => { // adjust textarea height whenever chatHistory changes
        adjustInputHeight()
        if (chatHistory.entries.length > entries.length * 2) {
            dispatch({
                type: 'RESET'
            })
        }
    }, [chatHistory, adjustInputHeight, entries])

    const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => { // Function to handle textarea value change
        dispatch({
            type: 'UPDATE_ANSWER',
            value: e.target.value
        })
    }, [])

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => { // Function to handle form submission
        e.preventDefault()
        dispatch({
            type: 'NEXT_STEP',
        })
    }, [])

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => { // Function to handle keydown event on textarea and detect a 'Enter' or 'ctrl+Enter' keyDown
        if (e.key === 'Enter') {
            if (e.ctrlKey) {
                dispatch({
                    type: 'UPDATE_ANSWER',
                    value: e.currentTarget.value + '\n'
                })
            } else {
                e.preventDefault()
                dispatch({
                    type: 'NEXT_STEP',
                })
            }
        }
    }, [])
    const handleResetClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        dispatch({
            type: 'RESET'
        })
    }, [])

    return (
        <div className={styles['contact-form-container']}>
            <div className={styles['chat-container']}>
                {initialMsg &&
                    <div className={styles['record-container']}>
                        <span className={styles.question}>
                            {initialMsg}
                        </span>
                    </div>}
                {chatHistory.entries.slice(0, chatHistory.activeStep + 1).map((record, index) => { // Display chat history records until the active step
                    return (
                        <div
                            className={styles['record-container']}
                            id={record.name} key={index.toString() + record + 'contactformchat'}
                        >
                            <span className={styles.question}>
                                {record.question}
                            </span>
                            {index < chatHistory.activeStep && record.answer && // Display answer if it exists and the step is already passed
                                <span className={styles.answer}>
                                    {record.answer}
                                </span>
                            }
                        </div>
                    )
                })}
                {endMsg && chatHistory.sent && // Display end message if it exists and the conversation is sent
                    <div className={styles['record-container']}>
                        <span className={styles.question}>
                            {endMsg}
                        </span>
                    </div>}
            </div>
            <form 
                className={`${styles['answer-form']} ${chatHistory.inactiveInput ? styles.inactive : ''}`} 
                onSubmit={handleSubmit}
                >
                <span className={styles.info}><b>Ctrl + Enter</b> pour aller à la ligne</span>
                <textarea 
                    ref={inputRef} 
                    readOnly={chatHistory.inactiveInput ? true : false} 
                    onKeyDown={handleKeyDown} 
                    onChange={handleInputChange} 
                    value={chatHistory.entries[chatHistory.activeStep]?.answer ?? ''} 
                    />
                <button aria-label='Envoyer'>
                    <SendIcon />
                </button>
            </form>
            <a className={styles.reset} href="" onClick={handleResetClick}>Effacer la conversation</a>
        </div>

    )
}

export default ContactForm