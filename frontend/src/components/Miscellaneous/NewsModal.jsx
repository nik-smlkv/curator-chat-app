
import { ViewIcon } from '@chakra-ui/icons';
import { Box, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

const NewsModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose, onSave } = useDisclosure();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	return <>
		{children ? (<span onClick={onOpen}>{children}</span>) : (
			<IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
		)}
		<Modal size="full" isOpen={isOpen} onClose={onClose} onSave={onSave} isCentered>
			<ModalOverlay />
			<ModalContent >
				<ModalHeader
					fontSize="36px"
					fontFamily="Work sans"
					display="flex"
					justifyContent="center"
				>Редактирование профиля
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
						<FormControl id="first-name" isRequired>
							<InputGroup size="md">
								<Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" mr="45px" textAlign="left">
									ФИО:
								</Text>
								<Input
									mb="5px"
									placeholder={user.name}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</InputGroup>
							<InputGroup size="md">
								<Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" mr="20px" textAlign="left">
									Группа:
								</Text>
								<Input
									mb="5px"
									placeholder={user.groupId}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</InputGroup>

						</FormControl>
						<Box display="flex" justifyContent="space-between" flexDirection="column" w="100%" p="10px" mt={5}>
							<Button colorScheme='green' onClick={onSave}>
								Сохранить
							</Button>
						</Box>
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

export default NewsModal;
