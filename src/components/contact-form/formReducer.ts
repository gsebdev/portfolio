export interface Record {
    name: string,
    question: string,
    answer?: string,
    validators?: { fn: (str: string) => Boolean, msg: string }[]
}

type chatHistoryState = {
    activeStep: number,
    entries: Record[],
    isEnd: Boolean,
    sent: Boolean,
    isError?: string,
    init: Record[]
}

type chatHistoryAction = {
    type: string,
    value?: string
}

const formReducer = (state: chatHistoryState, action: chatHistoryAction) => {
    try {
        switch (action.type) {
            case 'SET_SENT': {
                return {
                    ...state,
                    sent: true
                }
            }
            case 'SET_ERROR': {
                return {
                    ...state,
                    isError: action.value
                }
            }
            case 'NEXT_STEP': {
                const data = {
                    ...state,
                    entries: state.entries.map(e => ({ ...e }))
                }
                const { activeStep, entries } = data
                const { validators, answer, name } = entries[activeStep]
                const formatedAnswer = answer?.replace(/\r?\n|\r/g, ' ') // removes line breaks
                // if the current answer is empty or doesn't exists
                if (!formatedAnswer || /^\s+$/.test(formatedAnswer)) {
                    return state
                }

                // validate the answer with the validators
                if (validators) {
                    for (const validator of validators) {
                        if (!validator.fn(formatedAnswer)) {
                            entries.splice(activeStep + 1, 0, {
                                name: name,
                                question: validator.msg,
                                validators: validators
                            })
                            entries[activeStep].name = 'error'
                            data.activeStep += 1
                            return data
                        }
                    }
                }
                // update to next step if no errors
                const nextStep = activeStep < entries.length ? activeStep + 1 : activeStep

                if (nextStep < entries.length) {
                    // replace [variable string] in question
                    let { question } = entries[nextStep]
                    const variableWords = question.match(/\[(.*?)\]/g) // get variable words
                    if (variableWords) {
                        variableWords.forEach(word => { // replace all variable words
                            const replacementWord = entries.find(record => record.name === word.slice(1, -1))?.answer ?? ''
                            question = question.replace(word, replacementWord.replace(/\r?\n|\n/g, ''))
                        })
                        entries[nextStep].question = question
                    }
                } else {
                    data.isEnd = true
                }
                data.activeStep = nextStep
                return data
            }
            case 'UPDATE_ANSWER': {
                const { activeStep, entries } = state
                const { value } = action

                if (activeStep < entries.length && value !== null && value !== undefined) {
                    return {
                        ...state,
                        entries: entries.map((entry, i) => i === activeStep ? {
                            ...entry,
                            answer: value
                        } : entry
                        )
                    }
                }
                return state
            }
            case 'RESET': {
                return {
                    activeStep: 0,
                    entries: state.init.map(e => ({ ...e })),
                    isEnd: false,
                    sent: false,
                    init: state.init,
                }
            }
            default: throw Error('Unknown action type: ' + action.type)
        }
    } catch (error) {
        console.error('Error when tried to update the chat history', error)

        return state
    }

}

export default formReducer