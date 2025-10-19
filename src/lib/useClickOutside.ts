'use client';

import { useEffect, useRef, useCallback } from 'react';
import useDisclosure from './useDisclosure';

export const useClickOutside = () => {
	const modalState = useDisclosure();
	const ref = useRef<HTMLDivElement | null>(null);

	// Wrap close in useCallback so its identity is stable
	const handleClose = useCallback(() => {
		modalState.close();
	}, [modalState]);

	useEffect(() => {
		if (!modalState.isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!ref.current) return;
			if (!ref.current.contains(event.target as Node)) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [modalState.isOpen, handleClose]); // now all dependencies included

	return { ref, modalState };
};
