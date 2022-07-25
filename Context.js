import React from 'react';
export const ChatContext = React.createContext({
	chats: [],
	setChats: () => {},
	ws: "",
});