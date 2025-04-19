
import RoomCanvas from "@/components/RoomCanvas";
import { cookies } from "next/headers";

const CanvasPage = async ({
  params,
}: {
  params: {
    roomId: string;
  };
}) => {
  const roomId = (await params).roomId;
  const cookieStore = await cookies()
  const accesToken = cookieStore.get('accesToken')?.value || ""
  if(!accesToken){
    return;
  }
  return <RoomCanvas roomId={roomId} token={accesToken}/>;
};

export default CanvasPage;
