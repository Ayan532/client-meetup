import {
  Button,
  Heading,
  HStack,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  MenuDivider,
  Flex,
  Box,
  useColorModeValue,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Drawer,
  DrawerBody,
  VStack,
  Avatar,
  Input,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Divider
} from "@chakra-ui/react";

import { GiGraduateCap } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import { FaMeetup } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogoutUser } from "../../../Redux/Action/AuthAction";
import { useDispatch } from "react-redux";


const LinkBtn = ({ url = "/", title = "Home", onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);

const Navbar = ({user,isAuthenticated}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword,setKeyword]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const handleLogout=()=>{
    dispatch(LogoutUser())
   onClose()
  }


  return (

    <Flex
    className="sticky top-0"
      h={20}
      px={"5"}
      alignItems={"center"}
      bg={useColorModeValue("White", "gray.900")}
      zIndex={"overlay"}
      w="100%"
      justifyContent={"space-between"}
      borderBottom="1px"
      borderBottomColor={"gray.200"}
    >
      <Button
        size={"md"}
        colorScheme={"red"}
        width="12"
        height={"12"}
        rounded={"full"}
        justifyContent={"center"}
        aria-label={"Open Menu"}
        display={{ md: 'none' }}
        alignItems={"center"}
        onClick={onOpen}
      >
        <RiMenuFill />
      </Button>
      
      
        <Box>
          <Heading direction="row">
            <Link to="/">
              <Flex justifyContent="center" alignItems={"center"}>
                <FaMeetup className="text-red-500 text-5xl"/>
                Meetup
              </Flex>
            </Link>
          </Heading>
        </Box>
     
        <Box alignItems={'center'}>
        {isAuthenticated?( <HStack className="flex justify-between items-center gap-4">
             <IoMdNotificationsOutline className="text-3xl hidden md:block"/>
            <Link to='/conversation'> <AiOutlineMessage  className="text-3xl hidden md:block"/></Link>
          <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'md'}
                  src={user?.avatar.url}
                />
              </MenuButton>

              <MenuList>
                <MenuItem><LinkBtn onClose={onClose} url={`/profile/${user._id}`} title='Profile'/></MenuItem>
                <MenuItem><LinkBtn onClose={onClose} url='/manage-interest' title='Manage Interests'/></MenuItem>
                <MenuDivider />
                <MenuItem ><Button onClick={handleLogout} variant={'ghost'}>Sign Out</Button></MenuItem>
              </MenuList>
            </Menu></HStack>):(<Link><Button colorScheme="red">Sign In</Button> </Link>)}
        
       
        <Drawer placement='left'   onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay backdropFilter={'blur(10px)'}/>
          <DrawerContent>
          <DrawerHeader borderBottomWidth={"2px"}>
          <Heading> 
          <Flex justifyContent="center" alignItems={'center'}>
          <FaMeetup className="text-red-500 text-5xl"/>
                Meetup
            </Flex>
            </Heading>
            </DrawerHeader>
            <DrawerBody>
              <VStack>
                 <LinkBtn onClose={onClose} url='/' title='Home'/>
                 <LinkBtn onClose={onClose} url='/' title='Messages'/>
                 <LinkBtn onClose={onClose} url='/courses' title='Browse All Courses'/>
                 <LinkBtn onClose={onClose} url='/profile/123' title='Profile'/>
                 {/* <ColorModeSwitcher/> */}

              </VStack>

            </DrawerBody>
          </DrawerContent>
        </Drawer>



        </Box>
    </Flex>
    
  );
};

export default Navbar;
