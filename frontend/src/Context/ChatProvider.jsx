import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

import React from 'react'
import { useNavigate } from "react-router-dom";


const ChatContext = createContext();

const ChatProvider = ({children}) => {
   const [user,setUser] = useState();
   const [selectedChat, setSelectedChat] = useState();
   const [chats, setChats] = useState();
	const [admin, setAdmin] = useState();
   const [notification, setNotification] = useState([]);

   const navigate = useNavigate();

   useEffect(() =>{
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      if(!userInfo){
         navigate('/');
      }
   }, [navigate]);
  return (
     <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, admin, setAdmin, notification, setNotification, }}>
   {children}
   </ChatContext.Provider>
  )
}
export const ChatState = () =>{
   return useContext(ChatContext);
}


export default ChatProvider;
