
import { ChangeEvent, FormEvent, useCallback, useEffect, useReducer, useRef } from 'react'
import formReducer, { Record } from './formReducer'
import SendIcon from '../../assets/img/send.svg'
import { Answer, ChatForm, ContactFormContainer, Question, RecordContainer } from './contactFormStyledElements'


interface ContactFormProps {
    entries: Record[],
    initialMsg?: string,
    endMsg?: string,
    sendCallback?: (data: Record[]) => Promise<true | Error>
    style?: {
        primaryColor?: string
        secondaryColor?: string
        color?: string
        fontFamily?: string
        maxWidth?: number
        transitionDuration?: string
        bubbleBorderRadius?: number
        bubbleAside?: Boolean
        bubbleHeight?: number
        inputMinHeight?: number
        inputMaxWidth?: number
        inputBorderRadius?: number
    }
}

const ContactForm: React.FC<ContactFormProps> = ({ entries, initialMsg, endMsg, style, sendCallback }) => {
    const formRef = useRef<HTMLFormElement>(null)
    const inputRef = useRef<HTMLTextAreaElement | null>(null) // Reference to the textarea element
    const [chatHistory, dispatch] = useReducer(formReducer, { // State management for chat history
        activeStep: 0,
        entries: entries.map(e => ({ ...e })),
        isEnd: false,
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
        if (formRef.current) {
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
        if (chatHistory.isEnd === true && sendCallback && chatHistory.sent === false && !chatHistory.isError) {
            sendCallback(chatHistory.entries).then((response) => {
                if (response === true) {
                    dispatch({
                        type: 'SET_SENT'
                    })
                } else {
                    throw new Error('Erreur d\'envoi: ' + response.message)
                }

            }).catch((err) => {
                console.error(err.message)
                dispatch({
                    type: 'SET_ERROR',
                    value: 'Oups!\nUne Erreur est survenue lors de l\'envoi de votre message...'
                })
            })
        }
    }, [chatHistory, adjustInputHeight, placeFormAtBottom, entries, sendCallback])

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
        <ContactFormContainer
            $primaryColor={style?.primaryColor ?? 'darkmagenta'}
            $secondaryColor={style?.secondaryColor ?? 'blueviolet'}
            $fontFamily={style?.fontFamily}
            $color={style?.color}
            $maxWidth={style?.maxWidth}
            $transitionDuration={style?.transitionDuration}
            $borderRadius={style?.bubbleBorderRadius}
            $compact={style?.bubbleAside}
            $recordHeight={style?.bubbleHeight}
        >
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
                {chatHistory.isError &&
                    <RecordContainer>
                        <Question>{chatHistory.isError}</Question>
                    </RecordContainer>}
            </div>
            <ChatForm
                $isInactive={chatHistory.isEnd}
                $minHeight={style?.inputMinHeight}
                $maxWidth={style?.inputMaxWidth}
                $borderRadius={style?.inputBorderRadius}
                onSubmit={handleSubmit}
                ref={formRef}
                onFocus={placeFormAtBottom}
            >
                <span className='info'><b>Ctrl + Enter</b> pour aller à la ligne</span>
                <textarea
                    ref={inputRef}
                    readOnly={chatHistory.isEnd ? true : false}
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