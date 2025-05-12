import React from 'react';
import { PrimaryButton, IconButton } from '../Buttons/Button';
import { Link } from 'react-aria-components';
import { theme } from '../theme';
import { GitBranch, Settings, MoreVertical, Package, MoreHorizontal, Github } from 'lucide-react';

export interface ProjectLongCardProps {
  name: string;
  description?: string;
  status?: string;
  overviewUrl?: string;
  pipelinesUrl?: string;
  lastRun?: string;
  lastRunStatus?: 'success' | 'failed' | 'running' | 'canceled' | 'waiting';
  lastTriggeredBy?: string;
  lastTriggeredByIcon?: React.ReactNode;
  actionsMenu?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-gray-100 text-gray-800',
};

export const ProjectLongCard: React.FC<ProjectLongCardProps> = ({
  name,
  description,
  status = 'active',
  overviewUrl,
  pipelinesUrl,
  lastRun,
  lastRunStatus,
  lastTriggeredBy,
  lastTriggeredByIcon,
  actionsMenu,
  className = '',
  children,
}) => {
  return (
    <div className={`w-full flex flex-col md:flex-row items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-md mb-8 ${className}`}>
      <div className="flex items-center mr-8 mb-4 md:mb-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mr-4">
          <Package className="h-10 w-10 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{name}</div>
          {status && (
            <div className={`inline-block mt-1 px-3 py-1 rounded text-sm font-medium ${statusColors[status]}`}>{status}</div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {description && <div className="text-gray-600 text-base mb-2">{description}</div>}
        <div className="flex gap-4 mb-2">
          {overviewUrl && <Link href={overviewUrl} className="text-blue-600 hover:underline text-sm">Overview</Link>}
          {pipelinesUrl && <Link href={pipelinesUrl} className="text-blue-600 hover:underline text-sm">Pipelines</Link>}
        </div>
        {lastRun && (
          <div className="flex items-center text-sm">
            <span className="font-semibold mr-2">Last run:</span>
            <span className="mr-2">{lastRun}</span>
            {lastRunStatus === 'failed' && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 ml-1">&#10005;</span>
            )}
          </div>
        )}
        {lastTriggeredBy && (
          <div className="flex items-center text-sm">
            <span className="font-semibold mr-2">Last triggered by:</span>
            {lastTriggeredByIcon || <Github className="h-4 w-4 mr-1 text-gray-700" />}
            <span className="font-medium">{lastTriggeredBy}</span>
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {actionsMenu ? actionsMenu : (
          <IconButton className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
            <MoreHorizontal className="h-6 w-6" />
          </IconButton>
        )}
      </div>
      {children}
    </div>
  );
}; 