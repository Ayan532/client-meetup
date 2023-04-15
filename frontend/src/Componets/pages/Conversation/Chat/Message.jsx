import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { format } from 'timeago.js'



export default function Message({message,own}) {



  return (
    <div className={own?' flex items-end gap-3 flex-col':'flex gap-3 flex-col'}>
        <div className='flex gap-3'>
        <Avatar  src={message?.sender.avatar.url} size={"sm"}/>

        <div className={own?'bg-slate-100 text-black rounded-xl  p-[10px] break-words max-w-[400px]':'bg-red-500  max-w-[400px] text-white rounded-xl  p-[10px] break-words'} >
            <span>{message.message}</span>
        </div>
        </div>
            <div><span className='text-right text-sm  text-gray-500'>{format(message.createdAt)}</span></div>
    </div>
  )
}
