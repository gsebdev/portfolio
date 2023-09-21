import styled from 'styled-components'

export const ContactFormContainer = styled.div<{ $maxWidth?: number, $color?: string }>`
    max-width: ${({ $maxWidth }) => $maxWidth ? $maxWidth + 'px' : '640px'};
    margin: 0 auto;
    color: ${({ $color }) => $color ?? 'white'};
    .reset {
        color: ${({ $color }) => $color ?? 'white'};
        align-self: flex-start;
        font-size: 1rem;
        padding: 10px 0;
        opacity: 0.8;
    }
`
export const RecordContainer = styled.div<{ $compact?: Boolean }>`
    display: flex;
    flex-direction: ${({ $compact }) => $compact ? 'row' : 'column'};
`
const Record = styled.span<{ $maxWidth?: number, $recordHeight?: number, $borderRadius?: number, $bgColor?: string, $transitionDuration?: string }>`
    padding: 20px 40px;
    border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius + 'px' : '0px'};
    position: relative;
    font-weight: 500;
    font-size: 1.3rem;
    width: ${({ $maxWidth }) => $maxWidth ? ($maxWidth / 1.5) + 'px' : (640 / 1.5) + 'px'};
    min-height: ${({ $recordHeight }) => $recordHeight ? $recordHeight + 'px' : '75px'};
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
`
export const Question = styled(Record)`
    background: ${({ $bgColor }) => $bgColor ?? 'darkmagenta'};
    animation: appearQuestion ${({ $transitionDuration }) => $transitionDuration ? $transitionDuration + ' ' + $transitionDuration : '0.3s 0.3s'} ease-in-out both;
    align-self: flex-start;

    &::before {
        bottom: calc(100% - 1px);
        left: 1.5em;
        border-bottom: 0.75rem solid ${({ $bgColor }) => $bgColor ?? 'darkmagenta'};
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
    background: ${({ $bgColor }) => $bgColor ?? 'blueviolet'};
    animation: appearAnswer ${({ $transitionDuration }) => $transitionDuration ?? '0.3s'} ease-in-out;

    &::before {
        border-top: 0.75rem solid ${({ $bgColor }) => $bgColor ?? 'blueviolet'};
        top: calc(100% - 1px);
        right: 1.5em;
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
    $fontFamily?: string
    $minHeight?: number
    $maxWidth?: number
    $color?: string
    $bgColor?: string
    $buttonColor?: string
    $buttonBgColor?: string
    $borderRadius?: number
    $borderColor?: string
    $buttonHoverColor?: string
}

export const ChatForm = styled.form<ChatFormProps>`
    width: 100%;
    max-width: ${({ $maxWidth }) => $maxWidth ? $maxWidth + 'px' : '640px'};
    border-radius: ${({ $borderRadius }) => $borderRadius ? $borderRadius + 'px' : '0px'};
    display: block;
    position: relative;
    overflow: hidden;
    ${({ $isInactive }) => $isInactive ? 'opacity: 0.5; filter: grayscale(1);' : ''}
    
    .info {
        display: none;
        position: absolute;
        bottom: 5px;
        right: calc(20% + 10px);
        ${({ $color }) => $color ? 'color: ' + $color + ';' : ''}
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
        background: ${({ $bgColor }) => $bgColor ?? '#310060'};
        outline: none;
        border: 1px solid ${({ $borderColor }) => $borderColor ?? 'blueviolet'};
        min-height: ${({ $minHeight }) => $minHeight ? $minHeight + 'px' : 'blueviolet'};
        width: 100%;
        padding: 20px calc(20% + 10px) 20px 20px;
        resize: none;
        color: ${({ $color }) => $color ?? 'white'};
        font-size: 1.3rem;
        overflow: hidden;
        font-family: '${({ $fontFamily }) => $fontFamily}';
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
        background-color: ${({ $buttonBgColor }) => $buttonBgColor ?? 'blueviolet'};
        border: none;
        color: ${({ $color }) => $color ?? 'white'};
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            content: '';
            background: linear-gradient(to left, ${({ $buttonBgColor }) => $buttonBgColor ?? 'blueviolet'}, ${({ $buttonHoverColor }) => $buttonHoverColor ?? 'darkmagenta'} );
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
`