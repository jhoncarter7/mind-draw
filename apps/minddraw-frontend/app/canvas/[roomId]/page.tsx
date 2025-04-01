"use client";
import { initDraw } from "@/draw";
import React, { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas)
    }
  });
  return <canvas ref={canvasRef} width={1360} height={600}></canvas>;
};

export default Canvas;
