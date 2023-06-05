import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, Image, Text } from '@chakra-ui/react';

const NewsBox = () => {
	const { selectedChat } = ChatState();
	return (
		<Box display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
			alignItems="center"
			flexDir="column"
			p={3}
			bg="white"
			w={{ base: "100%", md: "30%" }}
			borderRadius="lg"
			borderWidth="1px"
		>
			<Image borderRadius="10px" src='https://static.bntu.by/bntu/new/news/image_13534_e645b61900eb35254f308b366b10a382.jpg%7CresizeToWidth=1400'></Image>
			<Text fontSize="25px" fontWeight="bold" textAlign="center" mt="10px">Проект «Время твоих возможностей 2.0»</Text>
			<Text textAlign="left" mt="10px">Заместитель председателя студенческого совета приняла участие в молодежном проекте «Время твоих возможностей 2.0»
				Наиболее эффектным и незабываемым стало дефиле, где девушки показали себя в трех образах: деловом, концептуальном и элегантном.
				Ярким и непредсказуемым продолжением программы стал конкурс «Импровизация», где участницы вытягивали ситуацию и за 2 минуты должны были придумать оригинальный и смешной выход из нее.
				В видеовизитках девушки рассказали о себе, своих увлечениях и достижениях, а продолжили покорять сердца зрителей своими творческими выступлениями,
				танцами в разных стилях и музыкальными композициями.
			</Text>
		</Box>
	)
}

export default NewsBox;