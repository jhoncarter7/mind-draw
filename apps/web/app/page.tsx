import Button from "../components/Button";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center w-screen" >
      <div className="flex flex-col gap-y-5 p-12 border-[1px] bg-gray-300 border-gray-400 justify-center items-center  rounded-lg shadow-2xl">
      <input type="text" placeholder="room slug" className="border-2 rounded-lg border-red-500 focus:outline-none p-1 px-4" />
      <Button text="join" />
      </div>
    </div>
  );
}
