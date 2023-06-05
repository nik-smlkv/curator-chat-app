import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessages }) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [groupChatName, setGroupChatName] = useState();
   const [search, setSearch] = useState("");
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);
   const { selectedChat, setSelectedChat, user } = ChatState();
   const [renameLoading, setRenameLoading] = useState();
   const toast = useToast();

   const handleRemove = async (user1) => {
      if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
         toast({
            title: "Только куратор может удалить кого-либо!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         return;
      }
      try {
         setLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };
         const { data } = await axios.put(`/api/chat/groupremove`,
            {
               chatId: selectedChat._id,
               userId: user1._id
            }, config);
         user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
         setFetchAgain(!fetchAgain);
			fetchMessages();
         setLoading(false);
      } catch (error) {
         toast({
            title: "Произошла ошибка!",
            description: error.message.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setRenameLoading(false);
      }
   };

   const handleRename = async () => {
      if (!groupChatName) { return; }
      try {
         setRenameLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         }
         const { data } = await axios.put("/api/chat/rename",
            {
               chatId: selectedChat._id,
               chatName: groupChatName,
            },
            config);
         setSelectedChat(data);
         setFetchAgain(!fetchAgain);
         setRenameLoading(false);
      } catch (error) {
         toast({
            title: "Произошла ошибка!",
            description: error.message.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setRenameLoading(false);
      }
      setGroupChatName("");
   };

   const handleSearch = async (query) => {
      setSearch(query);
      if (!query) { return; }
      try {
         setLoading(true)
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            }
         }
         const { data } = await axios.get(`/api/user?search=${search}`, config);
         setSearchResult(data);
         setLoading(false);
      } catch (error) {
         toast({
            title: "Произошла ошибка!",
            description: "Не удалось загрузить результаты поиска",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
         });
         setLoading(false);
      }
   };
   const handleAddUser = async (user1) => {
      if (selectedChat.users.find((u) => u._id === user1._id)) {
         toast({
            title: "Пользователь уже в группе ",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom"
         });
         return;
      }
      //Проверка на администратора
      if (selectedChat.groupAdmin._id !== user._id) {
         toast({
            title: "Только Куратор может добавить студента!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom"

         })
      }
      try {
         setLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`
            },
         };
         const { data } = await axios.put("/api/chat/groupadd", {
            chatId: selectedChat._id,
            userId: user1._id,
         }, config);
         setSelectedChat(data);
         setFetchAgain(!fetchAgain);
         setLoading(false);
      } catch (error) {
         toast({
            title: "Произошла ошибка!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
         });
         setLoading(false);
      }
   }
   return (
      <>
         <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen}></IconButton>
         <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{selectedChat.chatName}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                     {selectedChat.users.map(u => (<UserBadgeItem
                        key={user._id} user={u}
                        handleFunction={() => handleRemove(u)} />))}
                  </Box>
						{user.role === "Студент" ? <></> : 
						<FormControl display="flex">
                     <Input
                        placeholder='Название чата'
                        mb={3}
                        onChange={(e) => setGroupChatName(e.target.value)}
                     />
                     <Button
                        variant="solid"
                        colorScheme="teal"
                        ml={1}
                        isLoading={renameLoading}
                        onClick={handleRename}
                     >Обновить
                     </Button>
                  </FormControl>}
                  
                  <FormControl>
                     <Input
                        placeholder='Добавьте пользователя'
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                     />
                  </FormControl>
                  {loading
                     ? (<Spinner size="lg" />)
                     : (searchResult?.map((user) =>
                        <UserListItem
                           key={user._id}
                           user={user}
                           handleFunction={() => handleAddUser(user)}
                        />))}
               </ModalBody>
               <ModalFooter>
                  <Button onClick={() => handleRemove(user)} colorScheme="red">Покинуть группу</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

export default UpdateGroupChatModal
