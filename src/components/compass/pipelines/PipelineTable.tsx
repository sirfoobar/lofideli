import React from 'react';
import { MoreHorizontal, RotateCcw, XCircle, CheckCircle } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { Link } from '../Links';
import { PrimaryButton } from '../Buttons/Button';

type Pipeline = {
  id: string;
  name: string;
  number: string;
  status: 'success' | 'failed' | 'running' | 'canceled' | 'waiting';
  workflow: string;
  branch: string;
  commit: string;
  author: string;
  timestamp: string;
  duration: string;
};

// Sample data
const PIPELINES: Pipeline[] = [
  {
    id: '1',
    name: 'dogfood pipeline',
    number: '14616',
    status: 'failed',
    workflow: 'web-ui-workflow',
    branch: 'dark-mode',
    commit: 'c69289f Update jest snapshots',
    author: 'John Doe',
    timestamp: '19h ago',
    duration: '14m 17s',
  },
  {
    id: '2',
    name: 'dogfood pipeline',
    number: '14615',
    status: 'success',
    workflow: 'web-ui-workflow',
    branch: 'main',
    commit: 'fb5f647 Merge pull request #2707',
    author: 'Jane Smith',
    timestamp: '21h ago',
    duration: '28m 22s',
  },
  {
    id: '3',
    name: 'dogfood pipeline',
    number: '14614',
    status: 'failed',
    workflow: 'web-ui-workflow',
    branch: 'main',
    commit: 'fec46bc speed up jest w/ --changedSince',
    author: 'Alex Johnson',
    timestamp: '21h ago',
    duration: '38m 56s',
  },
  {
    id: '4',
    name: 'dogfood pipeline',
    number: '14613',
    status: 'success',
    workflow: 'setup',
    branch: 'main',
    commit: 'fec46bc speed up jest w/ --changedSince',
    author: 'Alex Johnson',
    timestamp: '21h ago',
    duration: '54s',
  },
];

function PipelineStatus({ status }: { status: Pipeline['status'] }) {
  let StatusIcon;
  let iconColor;

  if (status === 'success') {
    StatusIcon = CheckCircle;
    iconColor = 'text-green-500';
  } else if (status === 'failed') {
    StatusIcon = XCircle;
    iconColor = 'text-red-500';
  } else {
    StatusIcon = RotateCcw;
    iconColor = 'text-gray-500';
  }

  return (
    <div className="flex items-center">
      <StatusIcon className={`mr-2 h-5 w-5 ${iconColor}`} />
      <StatusBadge status={status} />
    </div>
  );
}

const PipelineTable: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pipeline</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Workflow</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Checkout source</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Trigger event</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Start</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {PIPELINES.map((pipeline) => (
            <tr key={pipeline.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 text-sm">
                <div>
                  <div className="font-medium text-gray-900">{pipeline.name}</div>
                  <div className="text-gray-500">{pipeline.number}</div>
                  <div className="text-xs text-gray-500">web-ui-consolidated</div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm">
                <PipelineStatus status={pipeline.status} />
              </td>
              <td className="px-4 py-4 text-sm">
                <Link href="#" className="text-blue-600 hover:underline">
                  {pipeline.workflow}
                </Link>
              </td>
              <td className="px-4 py-4 text-sm">
                <div>
                  <div className="font-medium text-gray-900">{pipeline.branch}</div>
                  <div className="text-gray-500">{pipeline.commit}</div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <span className="text-xs">{pipeline.author.charAt(0)}</span>
                  </div>
                  <span>Push commit pushed</span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm">{pipeline.timestamp}</td>
              <td className="px-4 py-4 text-sm">
                <div className="flex items-center">
                  <span>{pipeline.duration}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    {parseInt(pipeline.id) % 3 === 0 ? '↑' : '↓'} {parseInt(pipeline.id) % 2 === 0 ? 8 : 31}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-4 text-sm">
                <div className="flex space-x-2">
                  <PrimaryButton className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </PrimaryButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-4 border-t border-gray-200">
        <Link href="#" className="text-blue-600 hover:underline">View all pipelines</Link>
        <PrimaryButton className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
          <MoreHorizontal className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PipelineTable;