import React from 'react';
import { Check, X } from 'lucide-react';
import clsx from 'clsx';

type StatusType = 'success' | 'failed' | 'running' | 'canceled' | 'waiting';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusProps = () => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: <Check className="h-4 w-4 mr-1" />,
          label: 'Success',
        };
      case 'failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: <X className="h-4 w-4 mr-1" />,
          label: 'Failed',
        };
      case 'running':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: null,
          label: 'Running',
        };
      case 'canceled':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: null,
          label: 'Canceled',
        };
      case 'waiting':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: null,
          label: 'Waiting',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: null,
          label: status,
        };
    }
  };

  const { bg, text, border, icon, label } = getStatusProps();

  return (
    <div
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        bg,
        text,
        border,
        className
      )}
    >
      {icon}
      {label}
    </div>
  );
};

export default StatusBadge;