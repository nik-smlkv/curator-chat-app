import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [groupId, setGroupId] = useState();
	const [password, setPassword] = useState();
	const [role, setRole] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [pic, setPic] = useState();
	const [picLoading, setPicLoading] = useState(false);
	const toast = useToast();
	const navigate = useNavigate();
	const handleClick = () => setShow(!show);

	const submitHandler = async () => {
		setPicLoading(true);
		if (!name || !email || !password || !confirmPassword) {
			toast({
				title: "Пожалуйста, заполните все поля",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setPicLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			toast({
				title: "Пароли не совпадают",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			const { data } = await axios.post(
				"/api/user",
				{
					name,
					email,
					password,
					pic,
					role,
					groupId,
				},
				config
			);
			console.log(data);
			toast({
				title: "Регистрация прошла успешно",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			localStorage.setItem("userInfo", JSON.stringify(data));
			setPicLoading(false);
			navigate.push("/chats");
		} catch (error) {
			toast({
				title: "Произошла ошибка!",
				description: error.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setPicLoading(false);
		}
	};

	const postDetails = async (pics) => {
		setPicLoading(true);
		if (pics === undefined) {
			toast({
				title: "Пожалуйста, выберите изображение ",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			})
			return;
		}
		if (pics.type === "image/jpeg" || pics.type === "image/png") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "chat-app");
			data.append("cloud_name", "ddmakqmj6");
			fetch("https://api.cloudinary.com/v1_1/ddmakqmj6/image/upload", {
				method: 'post',
				body: data,
			})
				.then((res) => res.json())
				.then(data => {
					setPic(data.url.toString());
					setPicLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setPicLoading(false);
				});
		} else {
			toast({
				title: "Пожалуйста, выберите изображение ",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			setPicLoading(false);
			return;
		}

	}



	return (
		<VStack spacing="5px" color="black" >
			<FormControl id="first-name" isRequired>
				<FormLabel>Имя и Фамилия</FormLabel>
				<Input
					mb="5px"
					placeholder="Введите имя"
					onChange={(e) => setName(e.target.value)}
				/>
				<FormLabel>Номер группы</FormLabel>
				<Input
					mb="5px"
					placeholder="Введите номер группы"
					onChange={(e) => setGroupId(e.target.value)}
				/>
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
				<FormLabel>Подтвердите пароль</FormLabel>
				<InputGroup size="md">
					<Input
						mb="5px"
						type={show ? "text" : "password"}
						placeholder="Подтвердите пароль"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button
							h="1.75rem"
							size="sm"
							onClick={handleClick}
						>{show ? "Hide" : "Show"}</Button>
					</InputRightElement>
				</InputGroup>
				<FormLabel>Добавьте фотографию</FormLabel>
				<Input
					mb="15px"
					type="file"
					p={1.5}
					accept="image/*"
					placeholder="Добавьте фотографию"
					onChange={(e) => postDetails(e.target.files[0])}
				/>
			</FormControl>
			<Button
				colorScheme="green"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={submitHandler}
				isLoading={picLoading}
			>Зарегистрироваться</Button>
		</VStack>
	)
}

export default Signup
