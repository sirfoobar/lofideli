
import React, { useState } from 'react';
import { ModalWrapper } from '../Modal';
import { Button, SecondaryButton } from '../Buttons';

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
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-xl font-bold mb-2">Add New Pipeline</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">Pipeline Name</label>
          <input
            type="text"
            placeholder="Enter pipeline name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-neutral-200 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">Description</label>
          <input
            type="text"
            placeholder="Enter pipeline description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-neutral-200 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-700">Default Branch</label>
          <input
            type="text"
            placeholder="Enter default branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="border border-neutral-200 p-2 rounded-md"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <SecondaryButton onPress={onClose}>Cancel</SecondaryButton>
          <Button onPress={handleSave}>Save</Button>
        </div>
      </div>
    </ModalWrapper>
  );
};
