
import React from 'react';

const Overlay = ({ children, onClick }: { children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) => {
  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen z-100 bg-[rgba(22,22,22,0.8)] flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const ModalContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="shadow-[0px_0px_8px_0px_rgba(22,22,22,0.12)] rounded-lg bg-white text-gray-900 outline-none max-w-[500px] w-full"
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
