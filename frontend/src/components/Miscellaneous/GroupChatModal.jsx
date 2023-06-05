import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserListItem from '../UserAvatar/UserListItem';
import axios from 'axios';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [groupChatName, setGroupChatName] = useState();
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [searchResult, setSearchResult] = useState();
   const [loading, setLoading] = useState();
   const [search, setSearch] = useState();
   const toast = useToast();
   const { user, chats, setChats } = ChatState();

   const handleSearch = async (query) => {
      setSearch(query);
      if (!query) {
         return;
      }
      try {
         setLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };

         const { data } = await axios.get(`/api/user?search=${search}`, config);
         setLoading(false);
         setSearchResult(data);
      } catch (error) {
         toast({
            title: "Произошла ошибка!",
            description: "Не удалось загрузить результаты поиска",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
         })
      }
   };
   const handleGroup = (userToAdd) => {
      if(selectedUsers.includes(userToAdd)){
         toast({
            title: "Пользователь уже добавлен",
            status: "warning",
            duration:5000,
            isClosable:true,
            position:"top",
         })
      return;
      }

      setSelectedUsers([...selectedUsers, userToAdd]);
    };
   const handleDelete = (delUser) => {
      setSelectedUsers(selectedUsers.filter(sel=>sel._id !== delUser._id))
    };

   const handleSubmit = async () => {
      if(!groupChatName || !selectedUsers){
         toast({
            title: "Пожалуйста, заполните все поля",
            status:"warning",
            duration:5000,
            isClosable: true,
            position: "top"
         })
         return;
      }
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };

         const {data} = await axios.post('/api/chat/group', 
         { name:groupChatName, users:JSON.stringify(selectedUsers.map((u)=> u._id))}, config);

         setChats([data, ...chats]);
         onClose();
         toast({
            title: "Создан новый групповой чат!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
         })
      } catch (error) {
         toast({
            title: "Не удалось создать групповой чат",
            description: error.response.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top"
         })
      }
    };
   return (
      <>
         <span onClick={onOpen}>{children}</span>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader
                  fontSize="30px"
                  fontFamily="inherit"
                  display="flex"
                  justifyContent="center"
               >Добавить групповой чат</ModalHeader>
               <ModalCloseButton />
               <ModalBody display="flex" flexDir="column" alignItems="center">
                  <FormControl>
                     <Input
                        placeholder='Название чата'
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                     />
                  </FormControl>
                  <FormControl>
                     <Input
                        placeholder='Добавьте пользователя'
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                     />
                  </FormControl>
                  <Box display="flex" w="100%" flexWrap="wrap">
                  {selectedUsers.map(u => (<UserBadgeItem key={user._id} user={u}
                     handleFunction={()=> handleDelete(u)}
                  />)) }
                  </Box>
                  {loading
                     ? <div>loading</div>
                     : (searchResult?.slice(0, 4).map(user =>
                        <UserListItem key={user._id} user={user}
                           handleFunction={() => handleGroup(user)} />))}
               </ModalBody>
               <ModalFooter>
                  <Button colorScheme='blue' onClick={handleSubmit}>
                     Создать групповой чат
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>);
}

export default GroupChatModal
