'use client';

import { useEffect, useRef } from 'react';
import useDisclosure from './useDisclosure';

export const useClickOutside = () => {
 const modalState = useDisclosure();
 const ref = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  if (!modalState.isOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
   if (!ref.current) return null;
   if (ref.current && !ref.current.contains(event.target as Node)) {
    modalState.close();
   }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
   document.removeEventListener('mousedown', handleClickOutside);
  };
 }, [modalState.isOpen]);

 return { ref, modalState };
};
