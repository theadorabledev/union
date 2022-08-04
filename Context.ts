import React, {Dispatch,useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import { SignalProtocolStore } from "./storage-type";
import {
	MessageType,
  } from "@privacyresearch/libsignal-protocol-typescript";



export interface Chat{
	id:string;
	contactids:string[];
	messages:ProcessedChatMessage[];
	chatname:string;
	chatpic:ImageSourcePropType;
	description:string;
}

export interface Contact{
	id:string;
	username:string;
	profilepic:ImageSourcePropType;
	pronouns:string;
}

export interface ProcessedChatMessage {
	messageId: string;
	message: string;
	senderId:string;
	chatId:string;
	recieverId:string;
	date:Date;
	delivered: boolean;
}

interface ChatMessage {
	messageId: number;
	message: MessageType;
	senderId: string;
	chatId:string;
	recieverId:string;
	date:Date;
	delivered: boolean;
  }



const chattype: Dispatch<React.SetStateAction<Map<string, Chat>>> = () =>{};
const contacttype: Dispatch<React.SetStateAction<Map<string, Contact>>> = () =>{};
const websockettype: React.Dispatch<React.SetStateAction<WebSocket>> = () => {};
const stringhandlertype: React.Dispatch<React.SetStateAction<string>> = () => {};
export const ChatContext = React.createContext({
	chats: new Map<string,Chat>(),
	setChats: chattype,
	ws: new WebSocket('ws://localhost/'),
	setWs:websockettype,
});
export const ContactContext = React.createContext({
	contacts: new Map<string,Contact>(),
	setContacts: contacttype,
	userid: "string",
	setUserId:stringhandlertype,
});

export const SignalContext = React.createContext({
	userStore: new SignalProtocolStore(),
	createUserIdentity: () => {},
});