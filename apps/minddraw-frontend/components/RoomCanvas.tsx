"use client";
import React from "react";
import Canvas from "./Canvas";
import { useState } from "react";
import { useEffect } from "react";
import { WS_URL } from "@/app/config";

const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [sockets, setSockets] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token  = localStorage.getItem('accesToken')|| "";
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
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
