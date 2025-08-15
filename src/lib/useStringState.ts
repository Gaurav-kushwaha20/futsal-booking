import { useCallback, useState } from "react";

interface UseStringState {
    values: string;
    setValue: (value: string) => void;
    clearValue: () => void;
}

const useStringState = (initialValue: string | (() => string)): UseStringState => {
    const [values, setValues] = useState<string>(initialValue || "")

    const setValue = useCallback((val: string) => setValues(val), [])
    const clearValue = useCallback(() => setValues(""), [])

    return { values, setValue, clearValue }
}

export default useStringState;