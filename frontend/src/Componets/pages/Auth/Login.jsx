import { Box, Button, Container, Divider, Flex, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import {GiGraduateCap} from 'react-icons/gi'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMeetup } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../Redux/Action/AuthAction'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
   const loginHandler=(e)=>{
    e.preventDefault()
    console.log(email,password);
    const loginData={email,password}

    dispatch(loginUser(loginData))

   }
   
  return (
    <Flex  h={"100vh"}  bg={"whiteAlpha.900"} justifyContent="center"  alignItems="center">
    <VStack h={"70vh"} bg={"white"} padding={"10"} borderRadius={"20"} width="500px" justifyContent={"center"}  boxShadow="0px 5px 8px #00000029" spacing={"10"}>
       <Heading>
       <Flex justifyContent="center" alignItems={'center'}>
           <FaMeetup className="text-red-500 text-5xl"/>
                Meetup
            </Flex>
       </Heading>
       <Divider />
       <form onSubmit={loginHandler}  style={{width: '90%'}}>
       <Box marginY={"5"} width={"100%"}>
        <FormLabel htmlFor="email" children="Email Address"/>
        <Input required id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address" type={"email"} w="full"/>  
        </Box>
        <Box>
        <FormLabel htmlFor="password" children="Password"/>
        <Input required id="password"  value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type={"password"}/>  
        </Box>
        <Box>
            <Link to="/forget-password">
                <Button variant={"link"} fontSize={"sm"}>
                    Forget Password?
                </Button>
            </Link>
        </Box>
        
        <Button my="5" colorScheme='red' width={"full"} type={"submit"}>Sign In</Button>
        
        <Box>
        New User?{' '}
        <Link to="/register">
                <Button variant={"link"} fontSize={"sm"}>
                    Sign Up
                </Button>{" "}
                Here
            </Link>

        </Box>
       </form>
     

    </VStack>

    </Flex>

  )
}

export default Login