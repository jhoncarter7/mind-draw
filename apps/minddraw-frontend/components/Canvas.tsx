"use client";
// import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";
import { Game } from "./Game";

const Canvas = ({
  roomId,
  sockets,
}: {
  roomId: string;
  sockets: WebSocket | null;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      new Game(canvas, roomId, sockets);
      // initDraw();
    }
  }, [canvasRef]);
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Canvas;
