
import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useRef } from 'react'
import formReducer, { Record } from './formReducer'
import SendIcon from '../../assets/img/send.svg'
import { Answer, ChatForm, ContactFormContainer, Question, RecordContainer } from './contactFormStyledElements'


interface ContactFormProps {
    entries: Record[],
    initialMsg?: string,
    endMsg?: string,
    style?: {}
}

const ContactForm: React.FC<ContactFormProps> = ({ entries, initialMsg, endMsg, style }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const inputRef = useRef<HTMLTextAreaElement | null>(null) // Reference to the textarea element
    const [chatHistory, dispatch] = useReducer(formReducer, { // State management for chat history
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

    const placeFormAtBottom = useCallback(() => {
        if(formRef.current) {
            const { bottom } = formRef.current.getBoundingClientRect()
            window.scrollBy({
                top: bottom - window.innerHeight + 50,
                left: 0,
                behavior: 'smooth'
            })
        }
    }, [])

    useEffect(() => { // adjust textarea height whenever chatHistory changes
        adjustInputHeight()
        placeFormAtBottom()       
        if (chatHistory.entries.length > entries.length * 2) {
            dispatch({
                type: 'RESET'
            })
        }
    }, [chatHistory, adjustInputHeight, placeFormAtBottom, entries])

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
            e.preventDefault()
            if (e.ctrlKey) {
                dispatch({
                    type: 'UPDATE_ANSWER',
                    value: e.currentTarget.value + '\n'
                })
            } else {
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
        <ContactFormContainer>
            <div>
                {initialMsg &&
                    <RecordContainer>
                        <Question>{initialMsg}</Question>
                    </RecordContainer>}
                {chatHistory.entries.slice(0, chatHistory.activeStep + 1).map((record, index) => { // Display chat history records until the active step
                    return (
                        <RecordContainer id={record.name} key={index.toString() + record + 'contactformchat'}>
                            <Question>{record.question}</Question>
                            {index < chatHistory.activeStep && record.answer && <Answer>{record.answer}</Answer>}
                        </RecordContainer>
                    )
                })}
                {endMsg && chatHistory.sent && // Display end message if it exists and the conversation is sent
                    <RecordContainer>
                        <Question>{endMsg}</Question>
                    </RecordContainer>}
            </div>
            <ChatForm
                $isInactive={chatHistory.inactiveInput}
                onSubmit={handleSubmit}
                $buttonBgColor='red'
                ref={formRef}
                onFocus={placeFormAtBottom}
            >
                <span className='info'><b>Ctrl + Enter</b> pour aller à la ligne</span>
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
            </ChatForm>
            <a className='reset' href="" onClick={handleResetClick}>Effacer la conversation</a>
        </ContactFormContainer>

    )
}

export default ContactForm