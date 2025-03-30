import axios from "axios"
import { BACKEND_URL } from "../../config"
import ChatRoom from "../../../components/ChatRoom"

const getRoomId = async (slug: string): Promise<string> => {
    try {
        const res = await axios.get(`${BACKEND_URL}/chat/${slug}`);
        console.log("type of roomId", typeof res.data.room.id)
        return res.data.room.id;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch room ID");
    }
};


 const JoinRoom = async({params}: {params:{
    slug: string
}})=> {
    const slug = (await params).slug
    const roomId = await getRoomId(slug);
    if (!roomId) {
        throw new Error("Room ID is undefined");
    }
   


return (
    <>
    <ChatRoom roomId={roomId}/>
    </>
)
}

export default JoinRoom