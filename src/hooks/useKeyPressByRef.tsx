import { useCallback, useEffect } from "react";

export default function useKeyPressByRef(ref: any, callback: () => void, keys: string[]) {
    const element = ref.current
    const handler = useCallback(({ code }: KeyboardEvent) => {
        if(keys.includes(code)) {
            callback()
        }
    }, [callback, keys])

    useEffect(() => {
        if(element) {
            element.addEventListener('keydown', handler)
        }
        return () => {
            if(element){
                element.removeEventListener('keydown', handler)
            }
        }
    }, [element, handler, callback, keys])
}