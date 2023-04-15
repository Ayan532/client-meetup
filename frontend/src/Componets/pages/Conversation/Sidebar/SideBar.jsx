import { Avatar, Box, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SideBar({setSelectedChat}) {
  const {user:me}=useSelector((state)=>state.auth)
  const {conversations}=useSelector((state)=>state.conversations)


 
  return (
    <div className=' h-full  p-[20px]'>
      {/* <div className='p-2 px-5'>
      <Input
        // value={keyword}
        // onChange={e => setKeyword(e.target.value)}
        focusBorderColor={'gray'}
        placeholder="Search  Friends..."
        type={'text'}
        w={"90%"}
        
        variant="flushed"
      />
      </div> */}

      <VStack
        height={"100%"}
        overflowY={"auto"}

        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
            {/* { conversations && conversations.map((item)=>(
        <div onClick={()=>setSelectedChat(item)} key={item._id}  className=' w-[90%] flex gap-5 mt-5  items-center  hover:bg-slate-50 hover:rounded-sm p-2'>
          <Avatar src={item?.recipents[1].avatar.url}/>
           <Text  fontWeight={"bold"} children={item?.recipents[1].name}/>
          </div>
       ))} */}


       { conversations && conversations.map((item)=>(
        <div onClick={()=>setSelectedChat(item)} key={item._id}  className=' w-[90%] flex gap-5 mt-5  items-center  hover:bg-slate-50 hover:rounded-sm p-2'>
          <Avatar src={item?.recipents.find((m)=>m._id!==me._id).avatar.url}/>
           <Text  fontWeight={"bold"} children={item?.recipents.find((m)=>m._id!==me._id).name}/>
          </div>
       ))}


    
      

      </VStack>

      
    </div>
  )
}
