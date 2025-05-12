import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="2" />
      <circle cx="16" cy="16" r="6" fill="white" />
    </svg>
  );
};

export default Logo;