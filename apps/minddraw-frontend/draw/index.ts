import { BACKEND_URL } from "@/app/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export const initDraw = async (
  canvas: HTMLCanvasElement,
  roomId: string,
  sockets: WebSocket | null
) => {
  const ctx = canvas.getContext("2d");
// 
  const existingShape: Shape[] = await getExistingShape(roomId);
  if (!ctx) {
    return;
  }
  if (sockets) {
    sockets.onmessage = (event) => {
        const parseData = JSON.parse(event.data)
        if(parseData.type === "chat"){
            const parseShape = JSON.parse(parseData.message)
            existingShape.push(parseShape)
            clearAndDraw(existingShape, ctx, canvas);
        }
    };
  }
  clearAndDraw(existingShape, ctx, canvas);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let drawStart = false;
  let startX = 0;
  let startY = 0;
  canvas.addEventListener("mousedown", (e) => {
    drawStart = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    drawStart = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    existingShape.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    });
  });
  canvas.addEventListener("mousemove", (e) => {
    if (drawStart) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearAndDraw(existingShape, ctx, canvas);
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

export const clearAndDraw = (
  existingShape: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShape.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
};

export const getExistingShape = async (roomId: string) => {
  const res = await axios.get(`${BACKEND_URL}/api/v1/lastChat/${roomId}`);
  const messages = res.data;
  console.log("messs", messages)
  const shapes = messages.map((x: { message: string }) => {
    const parsedData = JSON.parse(x.message);
    return parsedData;
  });
  console.log("shapes", shapes)
  return shapes;
};
