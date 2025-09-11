"use client"
import React from 'react'
import Modal from '../Modal';
import UserLogin from '../UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { closeUserLoginModal } from '@/store/slices/userLoginModalSlice';

const UserLoginModal = () => {
    const dispatch = useDispatch()
    const isOpen = useSelector((state: RootState) => state.login_modal.showLoginModal)
    return (
        <Modal isOpen={isOpen} name='User Login' onOpenChange={() => { dispatch(closeUserLoginModal()) }}>
            <UserLogin />
        </Modal>
    )
}

export default UserLoginModal