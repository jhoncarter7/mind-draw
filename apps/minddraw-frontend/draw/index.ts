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

export const initDraw = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");

  const existingShape: Shape[] = [];

  if (!ctx) {
    return;
  }

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
      onDrawComplete(existingShape, ctx, canvas);
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

export const onDrawComplete = (
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
