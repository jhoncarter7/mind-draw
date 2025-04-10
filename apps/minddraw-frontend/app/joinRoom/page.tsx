"use client";
import { Button } from "@repo/ui/button";
import Input from "@repo/ui/Input";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { roomId } from "@/api/api";
const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();
  const handleJoinRoom = async () => {
    const getId = roomId(roomCode);
    console.log("roomCode", getId);
    const response = await getId;
    if (response && response.status === 200) {
      router.push(`/canvas/${response.data.id}`)
    }
  };
  return (
    <div>
      <Input
        placeholder="Enter room code"
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <Button onClick={handleJoinRoom}>Join</Button>
    </div>
  );
};

export default JoinRoom;
