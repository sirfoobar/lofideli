
import React from 'react';

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
  return (
    <form className="flex flex-col gap-6" {...props}>
      {children}
    </form>
  );
};

export const TextField: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="flex flex-col gap-2" {...props}>
      {children}
    </div>
  );
};

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => {
  return (
    <label className="text-gray-900 text-base font-medium leading-6" {...props}>
      {children}
    </label>
  );
};

export const FieldError: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...props }) => {
  return (
    <span className="text-red-500 text-sm leading-5" {...props}>
      {children}
    </span>
  );
};

export const HelperText: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...props }) => {
  return (
    <span className="text-gray-500 text-sm leading-5" {...props}>
      {children}
    </span>
  );
};
