// src/components/DeleteModal.tsx
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeleteModalProps {
    primaryMessage?: string;
    primaryButtonClassName?: string;
    secondaryMessage?: string;
    secondaryButtonClassName?: string;
    primaryButton?: string;
    secondaryButton?: string;
    className?: string;
    isOpen: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const AlertModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    isLoading,
    primaryMessage,
    primaryButtonClassName = '',
    secondaryMessage,
    secondaryButtonClassName = '',
    primaryButton,
    secondaryButton,
    className,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn(`max-w-2xl`, className)}>
                <DialogTitle>{primaryMessage || 'Confirm Deletion'}</DialogTitle>
                <DialogDescription>
                    {secondaryMessage || 'Are you sure you want to delete this item?'}
                </DialogDescription>
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={onClose}
                        className={`px-4 py-2 bg-gray-300 text-black rounded-md cursor-pointer ${secondaryButtonClassName}`}
                    >
                        {secondaryButton || 'Cancel'}
                    </button>
                    <button
                        onClick={() => {
                            onDelete();
                            onClose();
                        }}
                        className={`px-4 py-2 text-white bg-red-500 rounded-md cursor-pointer flex items-center gap-2 ${primaryButtonClassName}`}
                    >
                        {primaryButton || 'Delete'}
                        {isLoading && <Loader2 />}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AlertModal;
