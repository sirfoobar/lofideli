import React from 'react';
import { PrimaryButton, IconButton } from '../Buttons/Button';
import { Link } from 'react-aria-components';
import { theme } from '../theme';
import { GitBranch, Settings, MoreVertical, Package, MoreHorizontal, Github } from 'lucide-react';

export interface ProjectCardProps {
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

export const ProjectCard: React.FC<ProjectCardProps> = ({
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
    <div className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col ${className}`}>
      <div className="flex items-center mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 mr-3">
          <Package className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-900">{name}</div>
          {status && (
            <div className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}>{status}</div>
          )}
        </div>
        {actionsMenu ? actionsMenu : (
          <IconButton className="ml-auto rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
            <MoreHorizontal className="h-5 w-5" />
          </IconButton>
        )}
      </div>
      {description && <div className="text-gray-600 text-sm mb-4">{description}</div>}
      <div className="flex gap-4 mb-2">
        {overviewUrl && <Link href={overviewUrl} className="text-blue-600 hover:underline text-sm">Overview</Link>}
        {pipelinesUrl && <Link href={pipelinesUrl} className="text-blue-600 hover:underline text-sm">Pipelines</Link>}
      </div>
      {lastRun && (
        <>
          <div className="text-xs text-gray-500 mb-1">LAST RUN</div>
          <div className="flex items-center mb-1">
            <span className="text-xl font-bold mr-2">{lastRun}</span>
            {lastRunStatus === 'failed' && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 ml-1">&#10005;</span>
            )}
            {/* Add more status icons as needed */}
          </div>
        </>
      )}
      {lastTriggeredBy && (
        <>
          <div className="text-xs text-gray-500 mb-1">LAST TRIGGERED BY</div>
          <div className="flex items-center text-sm">
            {lastTriggeredByIcon || <Github className="h-4 w-4 mr-1 text-gray-700" />}
            <span className="font-medium">{lastTriggeredBy}</span>
          </div>
        </>
      )}
      {children}
    </div>
  );
}; 