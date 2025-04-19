"use client";
import { Button } from "@repo/ui/button";
import Input from "@repo/ui/Input";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { createRoom, roomId } from "@/api/api";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleJoinRoom = async () => {
    setLoading(true);
    const getId = roomId(roomCode);
    console.log("roomCode", getId);
    const response = await getId;
    if(!response){
    
      toast.error("Invalid room code. Please try again.");
      setLoading(false);
      return;
    }
    if ( response.status === 200) {
      router.push(`/canvas/${response.data.id}`);
      setLoading(false);
    } else {
      toast.error("Failed to join room. Please check the room code.");
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    const res = await createRoom(roomCode)
    console.log(res)
    if (!res) {

      toast.error("Room already exists");
      return;
    }
    if (res.status === 200) {
      toast.success("Room created successfully!");
      const newRoomId = res.data.id
      router.push(`/canvas/${newRoomId}`);
    } else {
      toast.error("Failed to create room. Please try again.");
    } 
  };
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div className="min-w-full sm:min-w-[70%] md:min-w-md mx-auto p-8 text-center from-purple-200 via-purple-100 to-purple-50 rounded-xl shadow-xl  bg-gradient-to-tr dark:from-stone-500 dark:to-stone-600 dark:via-stone-400"> 
      <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-900 dark:text-purple-100 drop-shadow-md">
        Join a Room
      </h2>
      <Input
        placeholder="Enter room code"
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="mb-6 "
        disabled={loading}
      />
      
      <div className="flex gap-4 justify-center items-center">
      <Button
        onClick={handleJoinRoom}
        disabled={loading || roomCode.trim() === ""}
        className="w-full "
      >
        {loading ? "Joining..." : "Join"}
      </Button>
      <Button
        onClick={handleCreateRoom}
        className="w-full flex items-center  justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Create Room
      </Button>
      </div>
    </div>
    </div>
  );
};

export default JoinRoom;
