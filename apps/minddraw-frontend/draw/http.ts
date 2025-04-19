import { BACKEND_URL } from "@/app/config";
import axios from "axios";

export const getExistingShape = async (roomId: string) => {
    const res = await axios.get(`${BACKEND_URL}/api/v1/lastChat/${roomId}`, {
      withCredentials: true,
    });
    const messages = res.data;
    console.log("message", messages)
    const shapes = messages.map((x: { message: string }) => {
      const messageData = JSON.parse(x.message);
   
      // const parsedData = JSON.parse(messageData.shape);
      if (messageData.length <= 0) {
        return messageData;
      }
      return messageData.shape;
    });
  
    return shapes;
  };