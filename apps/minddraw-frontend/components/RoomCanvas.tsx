"use client";
import React from "react";
import Canvas from "./Canvas";
import { useState } from "react";
import { useEffect } from "react";
import { WS_URL } from "@/app/config";

const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [sockets, setSockets] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZjkwZmVlNS0zYjAxLTRhZmMtYWViMy1lZTljMzk5NmNkMTgiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE3NDQ2NTE1MDMsImV4cCI6MTc0NDczNzkwM30.L4rn9FXRcROAB_2q4gYTqtRvXfMuCj9kCtYbp5LAX1Y`);
    ws.onopen = () => {
      setSockets(ws);

      ws.send(JSON.stringify({
        type: "join_room",
        roomId
      }))
    };
  }, []);
  if (!sockets) {
    return <div>conecting to server ....</div>;
  }
  return <Canvas roomId={roomId} sockets={sockets} />;
};

export default RoomCanvas;
