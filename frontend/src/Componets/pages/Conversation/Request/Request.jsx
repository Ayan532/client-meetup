import { Avatar, Button, Text, VStack } from '@chakra-ui/react'
import {TiTick} from 'react-icons/ti'
import {RxCross2} from 'react-icons/rx'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AcceptFriends, showFriends } from '../../../../Redux/Action/InterestAction'

export default function Request({friend}) {

  const dispatch=useDispatch()
  const handleFriendsAccept=async(e)=>{
    const action=e.target.value


     await dispatch(AcceptFriends(friend._id,action))
     dispatch(showFriends())

    
  }
  return (
 
     <div className=' w-[90%] flex gap-3 mt-5  items-center  hover:bg-slate-50 hover:rounded-sm p-2'>
    <Avatar src={friend?.avatar.url}/>
    <Text w={"70%"}  fontWeight={"bold"} children={friend?.name}/>
    <div className='flex gap-1'>
        <Button value={"confirm"} onClick={handleFriendsAccept}  colorScheme={"green"} size={"sm"}><TiTick /></Button>
        <Button value={"reject"} colorScheme={"red"} size={"sm"}><RxCross2/></Button>
    </div>
  </div>

  


  

  )
}
