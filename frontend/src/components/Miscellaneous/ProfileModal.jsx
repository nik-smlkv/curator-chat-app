import { ViewIcon } from '@chakra-ui/icons';
import { Box, Image, Text } from '@chakra-ui/react';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return <>
		{children ? (<span onClick={onOpen}>{children}</span>) : (
			<IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
		)}
		<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent >
				<ModalHeader
					fontSize="40px"
					fontFamily="Work sans"
					display="flex"
					justifyContent="center"
				>{user.name}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody
					display="flex"
					flexDir="column"
					alignItems="center"
					justifyContent="space-between"
				>
					<Image
						borderRadius="full"
						boxSize="150px"
						src={user.pic}
						alt={user.name}
					/>
					<Box display="flex" justifyContent="space-between" flexDirection="column" w="100%" p="10px">
						<Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" w="100%" textAlign="left">
							Почта: {user.email}
						</Text>
						{<Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" w="100%" textAlign="left">
							Роль: {user.role[0].role}
						</Text>}
						{user.role[0].role == "Куратор" ? (<></>) : (<Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" w="100%" textAlign="left">
							Группа: {user.groupId}
						</Text>)}
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={onClose}>
						Закрыть
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	</>;
}

export default ProfileModal;
