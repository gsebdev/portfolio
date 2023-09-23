import styled from 'styled-components'

interface ContactFormContainerProps {
    $maxWidth ?: number
    $color ?: string
    $primaryColor: string
    $secondaryColor: string
    $transitionDuration?: string
    $borderRadius?: number
    $fontFamily?: string
    $compact?: Boolean
    $recordHeight?: number
}

export const ContactFormContainer = styled.div<ContactFormContainerProps>`
    --primary-color: ${({ $primaryColor }) => $primaryColor};
    --secondary-color: ${({ $secondaryColor }) => $secondaryColor};
    --max-width: ${({ $maxWidth }) => $maxWidth ? $maxWidth + 'px' : '640px'};
    ${({ $fontFamily }) => $fontFamily ? `--font: '${$fontFamily}';` : ''}
    --color: ${({ $color }) => $color ?? 'inherit'};
    --border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius + 'px' : '0px'};
    --transition-duration: ${({ $transitionDuration }) => $transitionDuration ?? '0.5s'};
    --compact: ${({ $compact }) => $compact ? 'row' : 'column'};
    --record-height: ${({ $recordHeight }) => $recordHeight ? $recordHeight + 'px' : '75px'};
    font-family: var(--font, inherit);
    max-width: var(--max-width);
    margin: 0 auto;
    color: var(--color);
    .reset {
        display: block;
        color: var(--color);
        font-size: 1rem;
        padding: 10px 0;
        opacity: 0.8;
        @media(max-width: 768px) {
            text-align: center;
        }
    }
`
export const RecordContainer = styled.div`
    display: flex;
    flex-direction: var(--compact);
`
const Record = styled.span`
    padding: 20px 40px;
    border-radius: var(--border-radius);
    position: relative;
    font-weight: 500;
    font-size: 1.3rem;
    width: calc(var(--max-width) / 2);
    min-height: var(--record-height);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    overflow-wrap: anywhere;
    white-space: pre-line;

    &::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 0.75rem solid transparent;
    }
    @media(max-width: 768px) {
        padding: 10px 20px;
        max-width: calc(100vw / 1.5);
    }

`
export const Question = styled(Record)`
    background: var(--primary-color);
    animation: appearQuestion var(--transition-duration) var(--transition-duration) ease-in-out both;
    align-self: flex-start;

    &::before {
        bottom: calc(100% - 1px);
        left: calc(1.5em + var(--border-radius) / 2);
        border-bottom: 0.75rem solid var(--primary-color);
    }
    @keyframes appearQuestion {
        0% {
            opacity: 0;
            transform: translateY(-30%);
        }
    
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    
    }
`
export const Answer = styled(Record)`
    align-self: flex-end;
    background: var(--secondary-color);
    animation: appearAnswer var(--transition-duration) ease-in-out both;

    &::before {
        border-top: 0.75rem solid var(--secondary-color);
        top: calc(100% - 1px);
        right: calc(1.5em + var(--border-radius) / 2);
    }
    @keyframes appearAnswer {
        0% {
            opacity: 0;
            transform: translateY(30%);
        }
    
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    
    }
`
interface ChatFormProps {
    $isInactive?: Boolean
    $minHeight?: number
    $maxWidth?: number
    $borderRadius?: number

}

export const ChatForm = styled.form<ChatFormProps>`
    width: 100%;
    max-width: ${({ $maxWidth }) => $maxWidth ? $maxWidth + 'px' : '640px'};
    border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius + 'px' : '0px'};
    display: block;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    ${({ $isInactive }) => $isInactive ? 'opacity: 0.5; filter: grayscale(1);' : ''}
    
    .info {
        display: none;
        position: absolute;
        bottom: 5px;
        right: calc(20% + 10px);
        color: var(--color);
        font-size: smaller;
    }
    &:focus-within {
        .info {
            display: block;
            animation: fadeIn 0.3s 0.3s ease-in-out both;
        }
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0.5;
        } 
    }
    textarea {
        position: relative;
        display: block;
        background: transparent;
        outline: none;
        border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius + 'px' : '0px'};
        border: 1px solid var(--primary-color);
        min-height: ${({ $minHeight }) => $minHeight ? $minHeight + 'px' : '75px'};
        width: 100%;
        padding: 20px calc(20% + 10px) 20px 20px;
        resize: none;
        color: var(--color);
        font-size: 1.3rem;
        overflow: hidden;
        font-family: var(--font, inherit);
    }

    button {
        border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius + 'px' : '0px'};
        width: 20%;
        height: 100%;
        display: block;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        overflow: hidden;
        padding: 0;
        background-color: var(--secondary-color);
        border: none;
        color: var(--color);
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            background: linear-gradient(to left, var(--secondary-color), var(--primary-color) );
            transform: scaleX(0.5);
            transform-origin: left;
            transition: transform 0.3s ease, opacity 0.3s ease-in-out;
            z-index: -1;
            opacity: 0;
        }
        &:hover, &:focus {
            &::before {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
    @media(max-width: 768px) {
        max-width: calc(100vw - 20px);
    }
`