import { Badge, Box, Button, Flex, FormLabel, HStack, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, propNames, Select, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {RxCross1} from 'react-icons/rx'
import {IoIosAddCircle} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
// import { addInterest, createInterest, getInterest } from '../../../Redux/Action/InterestAction'
import { toast } from 'react-hot-toast'
import { addInterest, getInterest, removeInterest } from '../../../Redux/Action/InterestAction'
import { UserInterest } from '../../../Redux/Action/AuthAction'
const ManageInterest = () => {
    const dispatch=useDispatch()
    const {interest,error,message}=useSelector((state)=>state.interest)
    const {error:removeError,message:removeMsg}=useSelector((state)=>state.profile)
    const {userInterest}=useSelector((state)=>state.userInterest)
    const {user}=useSelector((state)=>state.auth)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [interestId,setInterestId]=useState('')


    const addInterestHandler=async(e)=>{
        e.preventDefault()
        console.log(interestId);
        if(interestId==='')
        {
          toast.error('Please select a interest')
        }
       await dispatch(addInterest(interestId))
        dispatch(UserInterest(user._id))
        
    }

    const handleRemoveInterest=async(id)=>{
      await dispatch(removeInterest(id))
      dispatch(UserInterest(user._id))
    }

     useEffect(() => {
      dispatch(UserInterest(user._id))
     }, [dispatch,user._id])
     
    useEffect(()=>{
      if(removeError)
      {
        toast.error(removeError)
        dispatch({type:"clearError"})
      }
      if(removeMsg)
      {
        toast.success(removeMsg)
        dispatch({type:"clearMessage"})
      }
      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }
       

      dispatch(getInterest())
      

    },[dispatch,error,message,removeError,removeMsg])
    
    
  return (
   
        <Flex  h={"100vh"}  bg={"whiteAlpha.900"} justifyContent="center"  alignItems="center">
       <VStack h={"70vh"} bg={"white"} padding={"10"} borderRadius={"20"} width="500px" justifyContent={"space-between"}  boxShadow="0px 5px 8px #00000029" spacing={"10"}>
        <div className='flex flex-wrap gap-3'>

        {
          userInterest && userInterest.interest && userInterest.interest.length>0?(
            userInterest.interest.map((item)=>(
              <Button key={item._id}leftIcon={<RxCross1 onClick={()=>handleRemoveInterest(item._id)} />}  variant='solid'>
                {item.name}
            </Button>
            ))
          ):(<h1>No Interest Found</h1>)
        }
        
    
        
        </div>

        <div onClick={onOpen}>
         <IoIosAddCircle className='text-blue text-5xl'/>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Interest</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form onSubmit={addInterestHandler}  >
       <Box marginY={"5"} width={"100%"}>
        

        <Select placeholder='Select an Interest to Add' onChange={(e)=>setInterestId(e.target.value)}>
          {
             interest?.map((item)=>(
              <option key={item._id} value={item._id}>{item.name}</option>
             ))
          }
        </Select>
    
        </Box>
    
        
        <Button my="5" colorScheme='red' width={"full"} type={"submit"}>Add</Button>
        
        
       </form>
          </ModalBody>
        </ModalContent>
   
      </Modal>
    

    </VStack>

    </Flex>
  
  )
}

export default ManageInterest