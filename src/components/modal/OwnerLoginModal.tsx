import React from 'react'
import OwnerLogin from '../OwnerLogin'
import Modal from '../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { closeOwnerLoginModal } from '@/store/slices/ownerLoginModalSlice'

const OwnerLoginModal: React.FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.owner_login_modal.showLoginMoal)
    return (
        <Modal isOpen={isOpen} name='Owner Login' onOpenChange={() => { dispatch(closeOwnerLoginModal()) }}>
            <OwnerLogin />
        </Modal>
    )
}

export default OwnerLoginModal