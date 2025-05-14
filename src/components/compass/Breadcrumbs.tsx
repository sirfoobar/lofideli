
import React from 'react';

export const Breadcrumbs: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ children, ...props }) => {
  return (
    <ul className="flex items-center list-none m-0 p-0 text-sm text-gray-700" {...props}>
      {children}
    </ul>
  );
};

export const Breadcrumb: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({ children, ...props }) => {
  return (
    <li className="after:content-['/'] after:px-1 last:after:content-['']" {...props}>
      {children}
    </li>
  );
};
