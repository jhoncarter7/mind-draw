import React from "react";
interface inputIF {
  // text: string,
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<inputIF> = ({ className, onClick, children }) => {
  return (
    <div
      className={`rounded-lg p-2 px-3 hover:shadow-md text-center cursor-pointer border-[1px] border-gray-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
