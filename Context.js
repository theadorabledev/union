import React from 'react';
export const ChatContext = React.createContext({
	chats: [],
	setChats: () => {},
	ws: "",
});
export const ContactContext = React.createContext({
	contacts: [],
	setContacts: () => {},
	userid: "",
});