
import {
    Button,
    Container,
    Divider,
    Heading,
    HStack,
    IconButton,
    Input,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from '@chakra-ui/react';
  import React, {  useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { findPeople } from '../../../Redux/Action/InterestAction';
import PeopleCard from '../../layouts/PeopleCard/PeopleCard';
import queryString from 'query-string';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
const Filter = () => {
  const [category,setCategory]=useState('')
  const [keyword,setKeyword]=useState('')
  const dispatch=useDispatch()
  const {people,interest,loading,error,message}=useSelector((state)=>state.interest)
  const elRef=useRef()


  const handleSubmit=(e)=>{
    e.preventDefault()
    setKeyword(elRef.current.value)
  }
  
  useEffect(()=>{
    
     if(keyword || category)
     {

      dispatch(findPeople(keyword,category))
   
     }
  

      

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    return ()=>{
      setKeyword('')
      setCategory('')
    }
  },[dispatch,keyword,category])


    const categories = [
      'Sports',
      'Hobbies',
      'Entertainment',
      'Travel',
      'Education',
      'Technology',
      "Fitness",
      'Social Causes',
      ];

      console.log(category);


      

 
  return loading===true?(<h1>Loading...</h1>):(
    <Container minH={'95vh'} maxW="container.xl" paddingY={'8'} marginY={"8"}>
    <Heading children={"Find People"} m={'8'}/>
{/* 
    <Input
    ref={elRef}
      value={keyword}
      onChange={e => setKeyword(e.target.value)}
      focusBorderColor={'gray'}
      placeholder="Find People based on Interest"
      type={'text'}/> */}
      <form onSubmit={handleSubmit} className="flex justify-center items-center gap-3 p-5">
        {/* <input /> */}
        <Input variant='outline'  ref={elRef} placeholder="Search Interest" />
        <IconButton type='submit' aria-label='Search database' icon={<AiOutlineSearch />} />
        {/* <button  className=''>Search</button> */}
      </form>

    <HStack
      overflow={'auto'}
      paddingY={'8'}
      css={{ '&::-webkit-scrollbar': { display: 'none' } }}
    >
      {categories.map((item, index) => (
        <Button
          key={index}
          onDoubleClick={() => setCategory('')}
          onClick={() => setCategory(item)}
          minW={'60'}
        >
          <Text children={item} />
        </Button>
      ))}
    </HStack>
    <Tabs ariant='soft-rounded' colorScheme='red'>
      <TabList>
        <Tab>Interest</Tab>
        <Tab>Users</Tab>
      </TabList>
      <TabPanels>
    <TabPanel>
      {interest.length>0?(
        interest.map((item)=>(
          <div key={item._id} className="flex flex-col">
          <Heading size={"xl"}>
              {item.name}
          </Heading>
          <Divider size={"lg"} mt="2" colorScheme="red" orientation='horizontal' />
             <Text fontSize='4xl' className='text-gray-500 mt-5'>{item.description}</Text>
        </div>
        ))

      ):(
        <h1>No Interest Found</h1>)}
    </TabPanel>
  <TabPanel>
    <Stack
    
    direction={['column', 'row']}
    flexWrap="wrap"
    justifyContent={['flex-start', 'space-evenly']}
    alignItems={['center', 'flex-start']}
  >
    {
      people.length > 0 ?(
        people.map((item)=>(
          <PeopleCard key={item._id} item={item}/>
        ))
      ):(<h1>No User Found</h1>)
    }

  </Stack>
    </TabPanel>
    </TabPanels>
    
    </Tabs>

   

   
    </Container>

  )
}

export default Filter