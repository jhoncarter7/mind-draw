import {
  Circle,
  Diamond,
  MoveRight,
  Pen,
  RectangleHorizontal,
} from "lucide-react";
import React from "react";

const TopBar = ({ selectedTool, setSelectedTool }) => {
  return (
    <div className="absolute top-10   text-white ">
      <div className="flex justify-center  gap-12 rounded-xl py-2 px-4 border-[1px] border-white">
        <Circle
          className={`${selectedTool == "circle" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("circle")}
        />
        <RectangleHorizontal
          className={`${selectedTool == "rect" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("rect")}
        />
        <Pen
          className={`${selectedTool == "pencil" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("pencil")}
        />
        <Diamond
          className={`${selectedTool == "diamond" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("diamond")}
        />
        <MoveRight
          className={`${selectedTool == "arrow" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("arrow")}
        />
      </div>
    </div>
  );
};

export default TopBar;
