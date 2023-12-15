// ** React Import
import { useRef, useEffect } from 'react'

// ** Custom hook to detect for first render
export const useIsMount = () => {
    const isMountRef = useRef(true)
    useEffect(() => {
        isMountRef.current = false
    }, [])
    return isMountRef.current
}