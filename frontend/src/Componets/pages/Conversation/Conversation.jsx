import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chat/Chat'
import SideBar from './Sidebar/SideBar'
import './Conversation.css'
import { Box, Heading, VStack } from '@chakra-ui/react'
import Request from './Request/Request'
import { useDispatch, useSelector } from 'react-redux'
import { showFriends } from '../../../Redux/Action/InterestAction'
import { getConversations, } from '../../../Redux/Action/ConversationAction'
import { SERVER } from '../../../Redux/store'
import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'
import axios from 'axios'

var socket;
var selectedChatCompare;
const Conversation = () => {
   const {friends}=useSelector((state)=>state.friends)
   const {user:me}=useSelector((state)=>state.auth)
   const [chatMsg,setChatMsg]=useState([])
   const [socketConnection,setSocketConnection]=useState(false)
   const {messages}=useSelector((state)=>state.conversations)
   const [selectedChat,setSelectedChat]=useState(null)
  //  const socket=useRef()

  const dispatch=useDispatch()
   
  // useEffect(() => {
  //    socket.current=io("ws://localhost:8900")
  // }, [])
  

  // useEffect(()=>{
  //  socket.current.emit("add-user",me._id)
  //  socket.current.on("getUser",(users)=>{
  //   console.log(users);
  //  })
  // },[me])
  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.emit("setup", me);
    socket.on("connected",()=>setSocketConnection(true));
    socket.on("typing", (room) => socket.in(room).emit("typing"));
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

   return ()=>{
    socket.disconnect()
   }
   
  },[]);


  useEffect(() => {
    dispatch(showFriends())
  }, [dispatch])

  useEffect(() => {
    dispatch(getConversations())
  }, [dispatch])

  
  useEffect(()=>{
  
      const getMessages=async()=>{
        try{
        const {data}=await axios.get(`${SERVER}/conversation/message/${selectedChat?._id}`,{
         
            withCredentials:true
        })
        setChatMsg(data.messages)
        socketConnection && socket.emit("join chat", selectedChat._id);


    } catch (err) {

       toast.error(err.response.data.message)
       
      }
      
    }

    if(selectedChat)
    {

      getMessages()
      selectedChatCompare = selectedChat;
    }

  },[selectedChat])

 

  useEffect(() => {
    socketConnection &&  (socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.ConversationId._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setChatMsg([...chatMsg, newMessageRecieved]);
      }
    }))
  });


  return (
    <div className='w-full  conversation flex'>

                <div className='flex-[3] '>
      
                      <SideBar  setSelectedChat={setSelectedChat}/>
                
                </div>
            <div className='flex-[6.5] border border-x-[1] border-y-0 border-gray-100'>
            <div className=' h-full p-[20px]'>

                  {selectedChat? <Chat socket={socket} chatMsg={chatMsg} setChatMsg={setChatMsg} selectedChat={selectedChat}/>:(<span className='flex justify-center items-center h-full font-semibold text-5xl text-gray-200'>Open Conversation to start a Chat</span>)}
            </div>
            </div>
            <div  className='flex-[3]' >
            <div className=' h-full p-[20px]'>
              
            <Box className='flex flex-col gap-1 overflow-y-auto h-[90%]'    css={{ '&::-webkit-scrollbar': { display: 'none' } }}>

                  {friends && friends.length>0 && friends.map((item)=>(
                    <Request friend={item}/>
                  ))}
              </Box>

             


             <div>

             </div>
            </div>


            </div>              
        
    </div>
  )
}

export default Conversation