import React from 'react'
import Navbar from '../../layouts/Navbar/Navbar'
import {Box, Button, Heading,Image, Stack, Text, VStack} from '@chakra-ui/react'
import bg from '../../../assets/bg.avif'
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <section className='w-full mt-10 container flex justify-center items-center p-5'>
        <div className="">
        <Stack
         direction={['column','column','row']}
         height="70vh"
         width={"full"}
         justifyContent={["center","center","space-evenly"]}
         alignItems='center'
         zIndex={"-1"}
         
        >
         


         <img   src={bg} className="w-full  lg:w-[72%]"/>          
       
        <VStack width={"full"}  alignItems={['center','center','flex-end']} spacing={"5"}>
        <Heading  size={['lg','lg','xl']} >
        The people platform
        </Heading>
        <Text fontSize={"20"}  >
        —Where interests become friendships
        </Text>
        <Link to='/filter' >
            <Button  size={"lg"}   colorScheme='red' mb={"15"} rounded={"10"}>Explore Now</Button>
        </Link>
        </VStack>
        </Stack>
        </div>
        </section>
  
  )
}

export default Home