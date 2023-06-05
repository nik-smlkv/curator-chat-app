import { Box, Container, Tab, TabList,Tabs,TabPanels, Text, TabPanel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import style from './HomePage.module.css';
import Login from './Auth/Login';
import Signup from './Auth/Signup.jsx';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
   const navigate = useNavigate();
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) {
         navigate('/chats');
      }
   }, [navigate]);
   return (
      <Container maxW='xl' centerContent>
         <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
         >
            <Text className={style.text} textAlign="center">Добро пожаловать</Text>
         </Box>
         <Box bg="white" w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px">
            <Tabs variant='soft-rounded' colorScheme='green' className='transition'>
               <TabList mb="1em">
                  <Tab width="50%">Авторизация</Tab>
                  <Tab width="50%">Регистрация</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel>{<Login/>} </TabPanel>
                  <TabPanel>{<Signup/>}   </TabPanel>
               </TabPanels>
            </Tabs>
         </Box>
      </Container>
   )
}

export default HomePage
