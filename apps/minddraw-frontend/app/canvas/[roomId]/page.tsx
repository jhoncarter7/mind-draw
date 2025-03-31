"use client";
import React, { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      let drawStart = false
      let startX = 0;
      let startY = 0;
      canvas.addEventListener("mousedown", (e) => {
        drawStart = true
        startX = e.clientX;
        startY = e.clientY;
      });
     canvas.addEventListener("mouseup", (e)=>{
        drawStart = false
     })
      canvas.addEventListener("mousemove", (e) => {
       if(drawStart){
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(startX, startY, width, height);
       }
      });
    }
  });
  return <canvas ref={canvasRef} width={500} height={500}></canvas>;
};

export default Canvas;
