import { useEffect, useState } from 'react'

const readStoredValue = (key, fallback, isValid) => {
    if (typeof window === 'undefined') {
        return fallback
    }

    try {
        const rawValue = window.localStorage.getItem(key)
        if (!rawValue) {
            return fallback
        }
        const parsedValue = JSON.parse(rawValue)
        if (isValid && !isValid(parsedValue)) {
            return fallback
        }
        return parsedValue
    } catch (error) {
        console.error(`Failed to read ${key} from localStorage`, error)
        return fallback
    }
}

const useLocalStorageState = (key, fallbackValue, isValid) => {
    const [value, setValue] = useState(() =>
        readStoredValue(key, fallbackValue, isValid)
    )

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(`Failed to write ${key} to localStorage`, error)
        }
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorageState
