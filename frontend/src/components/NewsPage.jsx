import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import NewsDrawer from './Miscellaneous/NewsDrawer';
import NewsBox1 from './NewsBox1';
import NewsBox2 from './NewsBox2';
import NewsBox3 from './NewsBox3';
import NewsBox4 from './NewsBox4';

const NewsPage = () => {
	const { user } = ChatState();
   const [fetchAgain, setFetchAgain] = useState(false);
	return (
		<div style={{ width: "100%"}}>
			{user && <NewsDrawer />}
			<Box display="flex" justifyContent="center"  h="70vh" p="10px">
				{user && <NewsBox1 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
			</Box>
			<Box display="flex" justifyContent="center"  h="70vh" p="10px">
				{user && <NewsBox2 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
			</Box>
			<Box display="flex" justifyContent="center"  h="70vh" p="10px">
				{user && <NewsBox3 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
			</Box>
			<Box display="flex" justifyContent="center"  h="70vh" p="10px">
				{user && <NewsBox4 fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
			</Box>
		</div>
	)
}

export default NewsPage