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
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
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
  private currentPath: { x: number; y: number }[] | null = null;

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
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
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
      } else if (shape.type === "pencil") {
        if (shape.points && shape.points.length > 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
          for (let i = 1; i < shape.points.length; i++) {
            this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
          }
          this.ctx.stroke();
        }
      }
    });
  }
  setTool(tool: "circle" | "rect" | "pencil") {
    this.selectedTool = tool;
  }

  handleMouseDown = (e: MouseEvent) => {
    console.log("down", e.pageX, this.canvas.offsetLeft);
    this.drawStart = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    if (this.selectedTool === "pencil") {
      this.startX = e.pageX - this.canvas.offsetLeft;
      this.startY = e.pageY - this.canvas.offsetTop;
      this.ctx.beginPath();
      this.currentPath = [{ x: this.startX, y: this.startY }];
    }
  };
  handleMouseUp = (e: MouseEvent) => {
    this.drawStart = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    const endX = e.pageX - this.canvas.offsetLeft;
    const endY = e.pageY - this.canvas.offsetTop;

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
    } else if (this.selectedTool === "pencil") {
      if (this.currentPath && this.currentPath.length > 0) {
        this.currentPath.push({ x: endX, y: endY });
        if (this.currentPath.length > 1) {
          shape = {
            type: "pencil",
            points: this.currentPath,
          };
        }
      }
      this.currentPath = null;
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
    if (this.drawStart) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      const currentX = e.pageX - this.canvas.offsetLeft;
      const currentY = e.pageY - this.canvas.offsetTop;
      console.log("mouse move", this.selectedTool);
      if (this.selectedTool === "pencil" && this.currentPath) {
        this.currentPath.push({ x: currentX, y: currentY });
      }
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
      } else if (this.selectedTool === "pencil") {
        if (this.currentPath && this.currentPath.length > 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.currentPath[0].x, this.currentPath[0].y);
          console.log("pencile start", this.currentPath, this.currentPath);
          for (let i = 1; i < this.currentPath.length; i++) {
            this.ctx.lineTo(this.currentPath[i].x, this.currentPath[i].y);
          }
          this.ctx.stroke();
        }
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
