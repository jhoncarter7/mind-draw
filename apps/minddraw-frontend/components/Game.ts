// import { getExistingShape } from "@/http.ts";

import { getExistingShape } from "./http";

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

export class Game {
  private canvas: HTMLCanvasElement;
  private roomId: string;
  private sockets: WebSocket | null;
  private ctx: CanvasRenderingContext2D;
  private existingShape: Shape[];
  private drawStart: boolean;
  private startX = 0;
  private startY = 0;
  private mouseupTrigger: boolean;
  constructor(
    canvas: HTMLCanvasElement,
    roomId: string,
    sockets: WebSocket | null
  ) {
    this.canvas = canvas;
    this.roomId = roomId;
    this.sockets = sockets;
    this.ctx = canvas.getContext("2d")!;
    this.existingShape = [];
    this.drawStart = false;
    this.mouseupTrigger = false
    this.init();
    this.initHandler();
    this.intMouseHandler();
  }

  async init() {
    this.existingShape = await getExistingShape(this.roomId);
    if (!this.ctx) {
      return;
    }
  }

  initHandler() {
    if (this.sockets) {
      this.sockets.onmessage = (event) => {
        const parseData = JSON.parse(event.data);
        if (parseData.type === "chat") {
          const parseShape = JSON.parse(parseData.message);
          this.existingShape.push(parseShape.shape);
          this.clearAndDraw();
        }
      };
    }
  }

  clearAndDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgb(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShape.map((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgb(255, 255, 255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    });
  }

  intMouseHandler() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.drawStart = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.mouseupTrigger = true;
    });
    this.canvas.addEventListener("mouseup", (e) => {
   
      this.drawStart = false;
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      const shape: Shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
      if (this.mouseupTrigger === true) {
        this.mouseupTrigger = false;
        this.existingShape.push(shape);
        this.sockets?.send(
          JSON.stringify({
            type: "chat",
            message: JSON.stringify({
              shape,
            }),
            roomId: this.roomId,
          })
        );
      }
      this.canvas.addEventListener("mousemove", (e) => {
        console.log("mousemove");
          if (this.drawStart) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearAndDraw();
            this.ctx.strokeStyle = "rgb(255, 255, 255)";
            this.ctx.strokeRect(this.startX, this.startY, width, height);
          }
        });
      // ctx.beginPath();
      // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
      // ctx.stroke();
    });
  }
}
