import { BACKEND_URL } from "@/app/config";
import axios from "axios";


export const roomId = async (roomCode:string) => {
  
    try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/chat/${roomCode}`, {
          withCredentials: true
        });
        console.log("awejfhakjsdf",res.status);
        return res
      } catch (err) {
        console.error("Failed to join room. Please try again.");
      }
}

export const createRoom = async(slug: string)=> {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/v1/create-room`, {
      slug
    }, {
      withCredentials: true
    })
    if(res.status === 201){
      return res.data.id
    }
    return null;  
  } catch (error) {
    
    console.error("Failed to create room. Please try again.");
    return null;
  }
}