
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge, { Effect } from 'react-notification-badge';
import SettingsModal from './SettingsModal';

const SideDrawer = () => {

	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState();
	const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast();


	const logoutHandler = () => {
		localStorage.removeItem("userInfo");
		navigate("/");
	};

	const handleSearch = async () => {
		if (!search) {
			toast({
				title: "Пожалуйста, введите что- нибудь в поиск",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "top-left",
			});
			return;
		}
		try {
			setLoading(true)

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				}
			}
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
			});
		}
	};

	const accessChat = async (userId) => {
		try {
			setLoadingChat(true);

			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.post('/api/chat', { userId }, config);
			if (!chats.find((c) => c._id === data._id)) { setChats([data, ...chats]); }
			setSelectedChat(data);
			setLoadingChat(false);
			onClose();
		} catch (error) {
			toast({
				title: "Ошибка загрузки чата",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom-left",
			});
		}
	}
	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				bg="white"
				w="100%"
				p="5px 10px 5px 10px"
				borderWidth="5px"
			>
				<Tooltip label="Поиск пользователей" hasArrow placement='bottom-end'>
					<Button variant="ghost" onClick={onOpen}>
						<i className="fas fa-search"></i>
						<Text d={{ base: "none", md: "flex" }} px="4">Поиск пользователей</Text>
					</Button>
				</Tooltip>
				<Text fontSize="24px" fontFamily="inherit">Добро пожаловать в чат</Text>
				<div>
					<Menu>
						<MenuButton p={1}>
							<NotificationBadge
								count={notification.length}
								effect={Effect.SCALE}
							/>
							<BellIcon fontSize="24px" m={1} />
						</MenuButton>
						<MenuList pl={2}>
							{!notification.length && "Новых сообщений нет!"}
							{notification.map(notif => (
								<MenuItem key={notif._id} onClick={() => {
									setSelectedChat(notif.chat);
									setNotification(notification.filter((n) => n !== notif));
								}}>
									{notif.chat.isGroupChat ? `Новое сообщение в ${notif.chat.chatName}` : `Новое сообщение от ${getSender(user, notif.chat.users)}`}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							<Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
						</MenuButton>
						<MenuList>
							<MenuItem><Link href="/">Главная</Link></MenuItem>
							<ProfileModal user={user}>
								<MenuItem>Профиль</MenuItem>
							</ProfileModal>
							<SettingsModal user={user}><MenuItem>Настройки</MenuItem></SettingsModal>
							<MenuItem><Link href="/news">Новости</Link></MenuItem>

							<MenuDivider />
							<MenuItem onClick={logoutHandler}>Выйти</MenuItem>
						</MenuList>
					</Menu>
				</div>
				<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerHeader borderBottomWidth="1px">Поиск пользователей</DrawerHeader>
						<DrawerBody>
							<Box display="flex" pb={2}>
								<Input
									placeholder="Поиск по имени или почте"
									mr={2}
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<Button onClick={handleSearch}>Поиск</Button>
							</Box>
							{loading ? (<ChatLoading />) : (
								searchResult?.map(user => (
									<UserListItem
										key={user._id}
										user={user}
										handleFunction={() => accessChat(user._id)} />)))}
							{loadingChat && <Spinner ml="auto" display="flex" />}
						</DrawerBody>
					</DrawerContent>
				</Drawer>
			</Box>
		</>
	)
}

export default SideDrawer;
