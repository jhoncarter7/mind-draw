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
          className={`${selectedTool == "pencile" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("pencile")}
        />
        <Diamond
          className={`${selectedTool == "diamond" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("diamond")}
        />
        <MoveRight
          className={`${selectedTool == "rightarrow" ? "text-red-500" : ""} `}
          onClick={() => setSelectedTool("rightarrow")}
        />
      </div>
    </div>
  );
};

export default TopBar;
