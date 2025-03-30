import axios from 'axios'
import React from 'react'
import { BACKEND_URL } from '../app/config'
import ChatClient from './ChatClient'

const getChats = async(roomId: string)=> {
    try {
        const resp = await axios.get(`${BACKEND_URL}/lastChat/${roomId}`)
        if(!resp.data){
            console.log(resp.data)
        }
        return resp.data.lastFiftyChattRes

    } catch (error) {
        console.log(error)
    }
}


const ChatRoom = async({roomId}: {
    roomId : string
}) => {
      const message  =   await getChats(roomId)
      console.log(message)
  return (
    <>
    <ChatClient message={message} roomId={roomId}/>
    </>
  )
}

export default ChatRoom