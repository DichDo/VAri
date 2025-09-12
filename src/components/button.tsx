import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    {children}
  </button>
);

export default Button;
