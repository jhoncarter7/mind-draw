"use client";
// import { initDraw } from "@/draw";
import React, { useEffect, useRef, useState } from "react";
import { Game } from "./Game";
import TopBar from "./TopBar";

export type Tool = "rect" | "circle" | "pencile";
const Canvas = ({
  roomId,
  sockets,
}: {
  roomId: string;
  sockets: WebSocket | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>()
  useEffect(()=>{
    game?.setTool(selectedTool)
  },[selectedTool])
  
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
    const g =  new Game(canvas, roomId, sockets);
      setGame(g)
      // initDraw();
      
    }
  }, [canvasRef]);
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >

      </canvas>
     <div className="flex justify-center">
     <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
     </div>
    </div>
  );
};

export default Canvas;
