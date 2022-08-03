import React from 'react';
import { SignalProtocolStore } from "./storage-type";
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

export const SignalContext = React.createContext({
	userStore: new SignalProtocolStore(),
	createUserIdentity: () => {},
});