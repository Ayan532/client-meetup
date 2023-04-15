
import { Avatar, Button, Container, Heading, HStack, Stack, VStack ,Text, Divider, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Badge} from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoadUser, myFriends, updateProfilePicture, UserInterest } from '../../../Redux/Action/AuthAction';
import { createConversation } from '../../../Redux/Action/ConversationAction';
import { HelloUser } from '../../../Redux/Action/InterestAction';
import ChangeProfileImage from './ChangeProfileImage';
import PeopleCard from '../../layouts/PeopleCard/PeopleCard';


const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {user:me}=useSelector((state)=>state.auth)
    const {userInterest:user,friends}=useSelector((state)=>state.userInterest)
    const {loading,message,error}=useSelector(state=>state.profile)
    const [following,setFollowing]=useState(false)
   const [friendReq,setFriendReq]=useState(false)
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleCreateConversation=async()=>{

      await dispatch(createConversation(params.id))

      navigate('/conversation')

    }

    const handleHelloUser=async()=>{

      if(me._id!==params.id)
      {

        await dispatch(HelloUser(user._id))
        dispatch(UserInterest(params.id))
      }
      

    }

    const changeImageSubmitHandler=async(e,image)=>{
      e.preventDefault();
      const myForm=new FormData()
      myForm.append("file",image)

     await dispatch(updateProfilePicture(myForm))
     
   
      

  }

    useEffect(() => {
      
      dispatch(UserInterest(params.id))
      dispatch(myFriends(params.id))

      
    }, [dispatch,params.id])
    useEffect(() => {
      if(user){
        user.friends.forEach((item) => {
          if (item == me._id) {
            setFollowing(true);
          } else {
            setFollowing(false);
          }
          
        });
      }
      if(user){
        if(user.request.length>0){
          user.request.forEach((item) => {
           
              if(item == me._id) {
                setFriendReq(true)
              }
              else{
                setFriendReq(false)
              }   
          })
         }
      }
    },[user, me.request,me._id ,params.id]);


    useEffect(() => {

      if(error){
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
          
        toast.success(message)
        dispatch({type:"clearMessage"})
        dispatch(LoadUser())
      }
  
    
    }, [error,message,dispatch])


   
    
  return (
    <Container minH={"95vh"} maxW="container.lg" py="20" >
    <Heading textTransform={"uppercase"}/>
    <Stack direction={['column', 'row']}
    justifyContent={"flex-start"}
    alignItems={"center"}
    spacing={['8','16']}
    p="8">
    <VStack>
        <Avatar src={user?.avatar.url} boxSize={"48"}/>
     {me._id ===params.id && <Button onClick={onOpen} colorScheme='blue' variant="ghost">Change Photo</Button>}
    </VStack>
    <VStack
    spacing={"4"}
    alignItems={["center",'flex-start']}>
         <HStack>
            <Text children="Name :" fontWeight={"bold"}/>
            <Text children={user?.name}/>
         </HStack>
         <HStack>
         <Text children="Email :" fontWeight={"bold"}/>
            <Text children={user?.email} />
         </HStack>
    <Stack direction={['column', 'row']}
    alignItems={"center"}>
    {me._id ===params.id ?(<><Link to="/updateprofile">
        <Button>Update Profile</Button>
     </Link>
     <Link to="/changepassword">
        <Button>Change Password</Button>
     </Link>
     {/* <Link to="/delete/me"> */}
     <Button  onClick={()=>setOpen(!open)} colorScheme='red'>Delete Profile</Button>
     {/* </Link> */}</>):(
        following ? (<><Button  colorScheme={'red'}>Unfollow</Button> <Button onClick={handleCreateConversation}>Message</Button></>):(!friendReq?<Button onClick={handleHelloUser} colorScheme={'red'}>Send Hello Request</Button>:<Button  colorScheme={'red'}>Request Sent</Button>)

     )
}
    </Stack>
    </VStack>
    </Stack>
    <Divider />
    <Heading  size="md" children={me._id===params.id?"My Interest":`${user?.name.split(' ')[0]}'s Interest`}/>
    <Flex>
        <HStack  overflow={'auto'}
        paddingY={'4'}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}>

{
          user && user.interest && user.interest.length>0?(
            user.interest.map((item)=>(
              <Badge key={item._id} rounded={"lg"} padding={"3"}>{item.name}</Badge>
            ))
          ):(<h1>No Interest Found</h1>)
        }
      
        </HStack>
    </Flex>
    <Heading  size="md" children={me._id===params.id?"My Friends":`${user?.name.split(' ')[0]}'s Friends`}/>

    <div className='flex flex-wrap p-5'>


    {
      friends && friends.friends.length > 0 && friends.friends.map((item)=>(
       
          <PeopleCard item={item} />

  
      )) 
    }
    </div>
     
    <ChangeProfileImage loading={loading} isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler}/>
    {/* <Modal
        isCentered
        isOpen={open}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete your profile?</ModalHeader>
          <ModalCloseButton textAlign={"center"}  onClick={()=>setOpen(!open)}/>
          <ModalBody>
            <Divider />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>setOpen(!open)}>
              No
            </Button>
            <Button colorScheme='red'   >Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Container>
  )
}

export default Profile