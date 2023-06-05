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
			<Image borderRadius="10px"  src='https://static.bntu.by/bntu/new/news/image_13564_a620e2a25443d3fc51a15ae6806287da.jpg%7CresizeToWidth=1400'></Image>
			<Text fontSize="25px" fontWeight="bold" textAlign="center" mt="10px"  >Итоги проведения ЦЭ в БНТУ</Text>
			<Text textAlign="left" mt="10px">В Беларуси впервые в истории прошел централизованный экзамен. На территории страны функционировали 144 пункта сдачи, и БНТУ стал крупнейшей площадкой сдачи ЦЭ в стране.
			На территории страны функционировали 144 пункта сдачи ЦЭ, и Белорусский национальный технический университет стал крупнейшей площадкой в стране: 
			2657 выпускника сдавали экзамены в пунктах сдачи БНТУ и 2353 – в пунктах филиалов БНТУ «Жодинский государственный политехнический колледж», 
			«Солигорский государственный горно-химический колледж», «Бобруйский государственный автотранспортный колледж», «Борисовский государственный политехнический колледж». 
			Таким образом, БНТУ принял около 10 % выпускников от общей цифры зарегистрированных на экзамен по стране. 
			</Text>
		</Box>
	)
}

export default NewsBox;