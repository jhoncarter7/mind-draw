"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import useSocket from "../hooks/useSocket";

const ChatClient = ({
  message,
  roomId,
}: {
  message: string[];
  roomId: string;
}) => {
  const { socket, loading } = useSocket();
  const [chats, setChats] = useState<{ message: string }[]>(
    message.map((m) => ({ message: m }))
  );
  const [currentMessage, setCurrentMessage] = useState("");
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomId,
        })
      );
      socket.onmessage = async (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [roomId, loading, socket]);

  return (
    <div className="h-screen flex items-center justify-center w-screen">
      {chats.map((chat, index) => (
        <div key={index}>{chat.message}</div>
      ))}
      <div className="flex flex-col gap-y-5 p-12 border-[1px] bg-gray-300 border-gray-400 justify-center items-center  rounded-lg shadow-2xl">
        <input
          type="text"
          placeholder="room slug"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="border-2 rounded-lg border-red-500 focus:outline-none p-1 px-4"
        />
        <Button text="send message" onClick={()=> {socket?.send(JSON.stringify({
          type: "chat",
          roomId,
          message: currentMessage
        }))
        setCurrentMessage("")
        }}/>
      </div>
    </div>
  );
};

export default ChatClient;
