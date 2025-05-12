import React from 'react';
import { ListFilter, ChevronDown } from 'lucide-react';
import { PrimaryButton } from '../Buttons/Button';
import { theme } from '../theme';
import { Play, Settings, MoreVertical } from 'lucide-react';
import { Input } from '../Inputs';

interface DropdownButtonProps {
  label: string;
  icon?: React.ReactNode;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ label, icon }) => {
  return (
    <PrimaryButton
      onPress={() => {
        console.log(`${label} button clicked`);
      }}
      className="flex items-center"
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
      <ChevronDown className="ml-2 h-4 w-4" />
    </PrimaryButton>
  );
};

interface PipelineHeaderProps {
  title: string;
}

const PipelineHeader: React.FC<PipelineHeaderProps> = ({ title }) => {
  return (
    <div className="mb-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <DropdownButton label="Everyone's Pipelines" />
        <DropdownButton label="All Projects" />
        <DropdownButton label="Select a Branch" />
        <DropdownButton label="All days" />
        <PrimaryButton
          onPress={() => {}}
          className="ml-auto p-2"
        >
          <ListFilter className="h-5 w-5" />
        </PrimaryButton>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Auto-expand</span>
          <div className="relative inline-block h-6 w-11 rounded-full bg-gray-200">
            <input
              type="checkbox"
              className="peer absolute h-0 w-0 opacity-0"
              id="auto-expand"
            />
            <label
              htmlFor="auto-expand"
              className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-blue-600"
            >
              <span className="absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            </label>
          </div>
        </div>
      </div>
      <Input
        type="text"
        placeholder="Search pipelines..."
        className="w-full max-w-md"
      />
    </div>
  );
};

export default PipelineHeader;