import { Box, Button, Divider, Flex, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoadUser, updateProfile } from '../../../Redux/Action/AuthAction'

const UpdateProfile = () => {
    const {user:me}=useSelector(state =>state.auth)
     const [email,setEmail]=useState(me.email)
     const [name,setName]=useState(me.name)
     const {loading}=useSelector(state =>state.profile)
     const dispatch=useDispatch()
     const navigate=useNavigate()
     const handleSubmit=async(e)=> {
      e.preventDefault();
     await dispatch(updateProfile(name,email))
     dispatch(LoadUser())
     me && navigate(`/profile/${me._id}`)

     }

  return (
    <Flex  h={"90vh"} justifyContent="center"  alignItems="center">
    <VStack h={"60vh"} borderRadius={"20"} width="600px" justifyContent={"center"}  boxShadow="0px 3px 6px #00000029" spacing={"5"}>
       <Heading textTransform={"uppercase"}>
        Update Profile
       </Heading>
       <Divider />
       <form onSubmit={handleSubmit} style={{width: '90%'}}>
   
       <Box marginY={"2"} width={"100%"}>
        <FormLabel htmlFor="name" children="Name"/>
        <Input required id="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Email Address" type={"text"} w="full"/>  
        </Box>
       <Box my={'2'} width={"100%"}>
        <FormLabel htmlFor="email" children="Email Address"/>
        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" type={"email"} w="full"/>  
        </Box>
    
        <Button my="2" isLoading={loading} colorScheme='red' width={"full"} type={"submit"}>Update Profile</Button>

       </form>
     

    </VStack>

    </Flex>


  )
}

export default UpdateProfile