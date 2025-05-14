
import React from 'react';

export const TextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <input {...props} className={`border rounded px-3 py-2 ${props.className || ''}`} />
    </div>
  );
};
