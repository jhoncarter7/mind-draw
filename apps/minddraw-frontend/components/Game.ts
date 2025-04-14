// import { getExistingShape } from "@/http.ts";

import { Tool } from "./Canvas";
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

type Dimention = {
  clientX: number;
  clientY: number;
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

  private selectedTool: Tool = "circle";
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

    this.init();
    this.initHandler();
    this.initMouseHandlers();

  }

  async init() {
    this.existingShape = await getExistingShape(this.roomId);
    // if (!this.ctx) {
    //   return;
    // }
    this.clearAndDraw();
  }

  removeMouseHandlers() {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.canvas.removeEventListener("mousemove", this.handleMouseMove);
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
        console.log("alwkendfwaf", this.selectedTool);
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
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          2 * Math.PI,
          true
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }
  setTool(tool: "circle" | "rect" | "pencile") {
    this.selectedTool = tool;
  }

  handleMouseDown = (e: MouseEvent) => {
    console.log("down")
    this.drawStart = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };
  handleMouseUp = (e: MouseEvent) => {
    this.drawStart = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    let shape: Shape | null = null;
    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
      // this.mouseupTrigger = false;
    } else if (this.selectedTool === "circle") {
      let radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radius: radius,
      };
    }
    if (!shape) {
      return;
    }
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
  };
  handleMouseMove = (e: MouseEvent) => {
    console.log("selected", this.selectedTool);
    console.log("mousemove");
    if (this.drawStart) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearAndDraw();
      this.ctx.strokeStyle = "rgb(255, 255, 255)";
      if (this.selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        const startAngle = 0;
        const endAngle = 2 * Math.PI;

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, startAngle, endAngle, true);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };
  // ctx.beginPath();
  // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  // ctx.stroke();
  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }
  destroy() {
    console.log("Destroying Game instance...");
    this.removeMouseHandlers();
    
  }
}
