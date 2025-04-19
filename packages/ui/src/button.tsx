"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  onClick?: () => void;
  disabled?: boolean
}

export const Button = ({ children, className, appName, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={ `border border-[1px] border-gray-300 rounded-xl p-2 cursor-pointer hover:shadow-md transformed transition all  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
