"use client"
import React from "react";

const Button = ({text, onClick}: {text: string, onClick?: ()=> void}) => {
  return (
    <button className="p-2 bg-green-500 w-24 rounded-lg cursor-pointer" onClick={()=> onClick}>
      {text}
    </button>
  );
};

export default Button;
