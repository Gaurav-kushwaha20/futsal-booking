"use client"
import { useModal } from '@/context/UserLoginContext'
import React from 'react'
import Modal from '../Modal';
import UserLogin from '../UserLogin';

const UserLoginModal = () => {
    const modalContext = useModal();
    if (!modalContext.isOpen) return null
    return (
        <Modal isOpen={modalContext.isOpen} name='Login' onOpenChange={modalContext.close}>
            <UserLogin />
        </Modal>
    )
}

export default UserLoginModal