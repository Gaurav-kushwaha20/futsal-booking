import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import LoadingScreen from './LoadingScreen';
import { cn } from '@/lib/utils';

interface IProps {
 isLoading?: boolean;
 isOpen: boolean;
 onOpenChange: () => void;
 name: string;
 children: React.ReactNode;
 className?: string;
 showCloseButton?: boolean;
}

const Modal: React.FC<IProps> = ({
 isOpen,
 name,
 onOpenChange,
 isLoading,
 className,
 showCloseButton = true,
 children,
}) => {
 return (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
   <DialogContent
    className={cn('max-w-4xl w-full max-h-[90vh] overflow-y-auto', className)}
    style={{ scrollbarWidth: 'thin' }}
    showCloseButton={showCloseButton}
   >
    <DialogHeader>
     <DialogTitle className="text-secondary-600 font-bold">{name}</DialogTitle>
    </DialogHeader>
    {!isLoading ? children : <LoadingScreen />}
   </DialogContent>
  </Dialog>
 );
};

export default Modal;
