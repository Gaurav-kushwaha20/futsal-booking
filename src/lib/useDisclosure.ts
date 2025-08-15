import { useState, useCallback } from 'react';

interface UseDisclosureReturn {
 isOpen: boolean;
 open: () => void;
 close: () => void;
 toggle: () => void;
 setOpen: (value: boolean) => void;
}

const useDisclosure = (initialState: boolean | (() => boolean) = false): UseDisclosureReturn => {
 const [isOpen, setIsOpen] = useState(initialState);

 const open = useCallback(() => setIsOpen(true), []);
 const close = useCallback(() => setIsOpen(false), []);
 const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
 const setOpen = useCallback((value: boolean) => setIsOpen(value), []);

 return { isOpen, open, close, toggle, setOpen };
};

export default useDisclosure;
