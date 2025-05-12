import React from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton, IconButton } from '../Buttons/Button';
import { Switch } from '../Switch';
import { useState, useEffect } from 'react';
import { theme } from '../theme';
import { Bell, HelpCircle, Menu, Search } from 'lucide-react';
import Logo from './Logo';
import { Input } from '../Inputs';

const TopNav: React.FC = () => {
  const [isSketchyMode, setIsSketchyMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('sketchy-mode', isSketchyMode);
  }, [isSketchyMode]);

  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <button
          className="rounded-md p-2 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-md border border-gray-200 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sketchy Mode</span>
          <Switch
            isSelected={isSketchyMode}
            onChange={setIsSketchyMode}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
          >
            <span className="sr-only">Toggle Sketchy Mode</span>
          </Switch>
        </div>

        <div className="flex items-center gap-2">
          <PrimaryButton className="text-gray-500 hover:text-gray-700">
            <Bell className="h-5 w-5" />
          </PrimaryButton>
          <IconButton>
            <HelpCircle className="h-5 w-5" />
          </IconButton>
          <PrimaryButton>Sign In</PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;