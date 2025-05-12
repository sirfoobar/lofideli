import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { PrimaryButton } from '../Buttons/Button';
import { theme } from '../theme';

interface NotificationBannerProps {
  title: string;
  message: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  title,
  message,
  type = 'info',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getBgColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className={`mb-4 flex items-center border p-4 rounded ${getBgColor()}`}>
      <div className={`mr-3 ${getIconColor()}`}>
        <Info className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="text-sm">{message}</div>
      </div>
      <PrimaryButton
        onPress={() => setIsVisible(false)}
        className="ml-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-5 w-5" />
      </PrimaryButton>
    </div>
  );
};

export default NotificationBanner;