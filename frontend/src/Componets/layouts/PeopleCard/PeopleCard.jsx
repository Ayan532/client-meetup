import { Avatar, Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
const PeopleCard = ({item}) => {
  console.log("hello");
  console.log(item);
  return (
    <div>
  <VStack className='course' padding={"2"}
      alignItems={['center','flex-start']}>
    <Link to={`/profile/${item._id}`}>
  <Box rounded={"lg"} width={"300px"} height={"340px"} className="flex flex-col justify-evenly gap-2 items-center shadow-lg p-4">
    <Avatar src={item.avatar.url} size="2xl" />
    {/* <Heading textAlign={['center','left']} maxW="200px" fontFamily={"sans-serif"} size="sm" noOfLines={3} children={"None"}/> */}
    <Text  noOfLines={2} children={item?.name}/>
    </Box>
    </Link>
   
    </VStack>
    </div>
  )
}

export default PeopleCard