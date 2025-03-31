import React from "react";
interface inputIF {
  // text: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<inputIF> = ({ className, onClick, children, type }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`rounded-lg p-2 px-3 hover:shadow-md text-center cursor-pointer border-[1px] border-gray-200  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
