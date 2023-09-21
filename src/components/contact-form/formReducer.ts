export interface Record {
    name: string,
    question: string,
    answer?: string,
    validators?: { fn: (str: string) => Boolean, msg: string }[]
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

const formReducer = (state: chatHistoryState, action: chatHistoryAction) => {
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

export default formReducer