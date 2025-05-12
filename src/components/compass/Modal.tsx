import React from 'react';
import styled from '@emotion/styled';
import { theme } from './theme';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background: rgba(22, 22, 22, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  box-shadow: 0px 0px 8px 0px rgba(22, 22, 22, 0.12);
  border-radius: ${theme.radii.card};
  background: ${theme.colors.white};
  color: ${theme.colors.n900};
  outline: none;
  max-width: 500px;
  width: 100%;
`;

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
