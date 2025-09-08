"use client"
import useDisclosure, { UseDisclosureReturn } from "@/lib/useDisclosure";
import React, { createContext, useContext } from "react";



const ModalContext = createContext<UseDisclosureReturn | undefined>(undefined)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const modal = useDisclosure();
    return (
        <ModalContext.Provider value={modal}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal must be used inside ModalProvider");
    return ctx;
};