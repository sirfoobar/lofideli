
import React from 'react';

const Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div
    {...props}
    className={`fixed top-0 left-0 w-screen h-screen z-100 bg-[rgba(22,22,22,0.8)] flex items-center justify-center ${props.className || ''}`}
  />
);

const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div
    {...props}
    className={`shadow-md rounded-lg bg-white text-gray-900 outline-none max-w-[500px] w-full ${props.className || ''}`}
  />
);

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
