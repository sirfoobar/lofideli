
import React from 'react';

// Export simple button components
export const BaseButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 ${props.className || ''}`}>{children}</button>
);

export const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 bg-blue-500 text-white rounded ${props.className || ''}`}>{children}</button>
);

export const SecondaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${props.className || ''}`}>{children}</button>
);

export const TertiaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 text-blue-500 underline ${props.className || ''}`}>{children}</button>
);

export const IconButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`p-2 rounded-full ${props.className || ''}`}>{children}</button>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 rounded ${props.className || ''}`}>{children}</button>
);
