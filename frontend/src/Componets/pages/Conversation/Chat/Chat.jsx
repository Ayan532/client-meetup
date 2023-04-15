import { Avatar, Box, Button, Textarea, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { getMessages } from '../../../../Redux/Action/ConversationAction'
import { SERVER } from '../../../../Redux/store'
import Message from './Message'

export default function Chat({socket,chatMsg,setChatMsg,selectedChat}) {
  const {user:me}=useSelector((state)=>state.auth)
  const {messages}=useSelector((state)=>state.conversations)
  const {conversations}=useSelector((state)=>state.conversations)
  const [msg,setMsg]=useState("")
  const scrollRef=useRef(null)
  const dispatch=useDispatch()



  const handleSendMsg=async(e)=>{
    e.preventDefault()

    const messageToSent={
      sender:me._id,
      message:msg,
      ConversationId:selectedChat._id
    }
    try{


      const {data}=await axios.post(`${SERVER}/conversation/message`,messageToSent,{

          headers:{
              "Content-Type":"application/json"
          },
  
  
          withCredentials:true
      })
      console.log(data.sendMessage);
      socket.emit("new message", data.sendMessage);
      setChatMsg([...chatMsg,data.sendMessage])
      setMsg("")

  } catch (err) {

    console.log(err);

  }



  }
  useEffect(() => {
    if(chatMsg?.length>0)
    {

      scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }
  }, [chatMsg])
  
  
  return (
    <>

      <Box className='flex flex-col gap-4 overflow-y-auto h-[90%]'    css={{ '&::-webkit-scrollbar': { display: 'none' } }}>

      {
        chatMsg && chatMsg?.length > 0 ?(
          chatMsg?.map((item)=>(
            <div ref={scrollRef}>

            <Message  message={item} own={item.sender._id==me._id}/>
            </div>
          ))
        ):(<span>No Messages to Display</span>)
      }
        {/* <Message own={false}/>
        <Message own={false}/>
        <Message own={true}/>
        <Message own={false}/>
        <Message own={true}/>
        <Message own={true}/> */}
      </Box>

      <div className=''>
        <form  onSubmit={handleSendMsg} className='flex justify-center items-center gap-2'>
          <Textarea required placeholder='Enter Your Message' value={msg} onChange={(e)=>setMsg(e.target.value)} />
          <Button type='submit' colorScheme={"red"}>Send</Button>
        </form>
      </div>
    
    </>
  )
}
