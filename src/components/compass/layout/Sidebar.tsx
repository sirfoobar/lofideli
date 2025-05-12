import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Home, PieChart, Settings, GitBranch, Package, LayoutGrid } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-gray-800 hover:bg-gray-200 ${
          isActive ? 'bg-gray-200' : ''
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-gray-100">
      <div className="flex items-center border-b border-gray-200 px-4 py-4">
        <span className="text-lg font-semibold">circleci</span>
        <ChevronDown className="ml-2 h-4 w-4" />
      </div>
      <nav className="flex flex-1 flex-col">
        <SidebarItem icon={<Home className="h-5 w-5" />} label="Organization Home" to="/org" />
        <SidebarItem 
          icon={<LayoutGrid className="h-5 w-5" />} 
          label="Pipelines" 
          to="/pipelines" 
        />
        <SidebarItem icon={<Package className="h-5 w-5" />} label="Projects" to="/projects" />
        <SidebarItem icon={<GitBranch className="h-5 w-5" />} label="Deploys" to="/deploys" />
        <SidebarItem icon={<PieChart className="h-5 w-5" />} label="Insights" to="/insights" />
        <SidebarItem 
          icon={<Settings className="h-5 w-5" />} 
          label="Organization Settings" 
          to="/settings" 
        />
      </nav>
    </div>
  );
};

export default Sidebar;