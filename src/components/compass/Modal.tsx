
import React from 'react';

const Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
  return (
    <div
      {...props}
      className={`fixed top-0 left-0 w-screen h-screen z-50 bg-black/80 flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => {
  return (
    <div
      {...props}
      className={`shadow-md rounded-lg bg-white text-neutral-900 outline-none max-w-md w-full ${className}`}
    >
      {children}
    </div>
  );
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        {children}
      </ModalContent>
    </Overlay>
  );
};
