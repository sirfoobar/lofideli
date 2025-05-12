import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ModalWrapper } from '../Modal';
import { Input } from '../Inputs';
import { PrimaryButton, SecondaryButton } from '../Buttons/Button';
import { theme } from '../theme';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space16};
  padding: ${theme.space.space24};
`;

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes.fontsize20};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.space.space8};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.space8};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.fontsize14};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.n700};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.space.space8};
  margin-top: ${theme.space.space16};
`;

interface AddPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string; branch: string }) => void;
}

export const AddPipelineModal: React.FC<AddPipelineModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [branch, setBranch] = useState('');

  const handleSave = () => {
    onSave({ name, description, branch });
    setName('');
    setDescription('');
    setBranch('');
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalTitle>Add New Pipeline</ModalTitle>
        <InputGroup>
          <Label>Pipeline Name</Label>
          <Input
            type="text"
            placeholder="Enter pipeline name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="Enter pipeline description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Label>Default Branch</Label>
          <Input
            type="text"
            placeholder="Enter default branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
        </InputGroup>
        <ButtonGroup>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        </ButtonGroup>
      </ModalContent>
    </ModalWrapper>
  );
}; 