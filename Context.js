import React from 'react';
export const ChatContext = React.createContext({
	chats: [],
	setChats: () => {},
	ws: "",
	setWs: () => {},
});
export const ContactContext = React.createContext({
	contacts: [],
	setContacts: () => {},
	userid: "",
	setUserId: () => {},
});

export const TestingContext = React.createContext({
	originalChats:new Map(),
	userid1: "",
	userid2: "",
});