import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login =  () => {
   const [show, setShow] = useState(false);
   const [email, setEmail] = useState();
   const [password, setPassword] = useState();
   const [loading, setLoading] = useState(false);
   const toast = useToast();
   const navigate = useNavigate();
   const handleClick = () => setShow(!show);

   const submitHandler = async () => {
       setLoading(true);
      if(!email || !password){
         toast({
            title: "Пожалуйста, заполните все поля",
            status:"warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
         return;
      }
      try {
         const config = {
            headers: {
               "Content-type": "application/json",
            },
         };
         const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
         );
         toast({
            title: "Авторизация прошла успешно",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         localStorage.setItem('userInfo', JSON.stringify(data));
			setLoading(false);
			if(email == 'admin' && password == 'admin'){
				navigate('/admin', {replace: true});
			}else{navigate('/chats', {replace: true});}
         
      } catch (error) {
         toast({
            title: "Произошла ошибка",
            description: error.response.data.messages,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
      } 
    };
  return (
     <VStack spacing="5px" color="black" >
        <FormControl id="first-name" isRequired>
           <FormLabel>Почта</FormLabel>
           <Input
              mb="5px"
              placeholder="Введите свой email"
              onChange={(e) => setEmail(e.target.value)}
           />
           <FormLabel>Пароль</FormLabel>
           <InputGroup size="md">
              <Input
                 mb="5px"
                 type={show ? "text" : "password"}
                 placeholder="Введите пароль"
                 onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                 <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClick}
                 >{show ? "Hide" : "Show"}</Button>
              </InputRightElement>
           </InputGroup>
        </FormControl>
        <Button
           colorScheme="green"
           width="50%"
           onClick={submitHandler}
           isLoading={loading}
        >Войти</Button>
     </VStack>
  )
}

export default Login;
