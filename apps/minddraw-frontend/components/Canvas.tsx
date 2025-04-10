"use client";
import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";

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
      initDraw(canvas, roomId, sockets);
    }
  });
  return <canvas ref={canvasRef} width={1700} height={750}></canvas>;
};

export default Canvas;
