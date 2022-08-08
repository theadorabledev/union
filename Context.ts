import React, {Dispatch,useState} from 'react';
import {ImageSourcePropType} from 'react-native';
import { SignalProtocolStore } from "./storage-type";
import {
	MessageType,
  } from "@privacyresearch/libsignal-protocol-typescript";


//chat interface
export interface Chat{
	id:string;
	contactids:string[];
	messages:ProcessedChatMessage[];
	chatname:string;
	chatpic:ImageSourcePropType;
	description:string;
}
//contact interface
export interface Contact{
	id:string;
	username:string;
	profilepic:ImageSourcePropType;
	pronouns:string;
}
//unencrypted chat interface
export interface ProcessedChatMessage {
	messageId: string;
	message: string;
	senderId:string;
	chatId:string;
	recieverId:string;
	date:Date;
	delivered: boolean;
}
//encrypted chat interface
export interface ChatMessage {
	messageId: number;
	message: MessageType;
	senderId: string;
	chatId:string;
	recieverId:string;
	date:Date;
	delivered: boolean;
  }


//React.Dispatch instances, used to instantiate the contexts used throughout the app.
const chattype: Dispatch<React.SetStateAction<Map<string, Chat>>> = () =>{};
const contacttype: Dispatch<React.SetStateAction<Map<string, Contact>>> = () =>{};
const websockettype: React.Dispatch<React.SetStateAction<WebSocket>> = () => {};
const stringhandlertype: React.Dispatch<React.SetStateAction<string>> = () => {};

//provides the chat state & websocket states to the rest of the app
export const ChatContext = React.createContext({
	chats: new Map<string,Chat>(),
	setChats: chattype,
	ws: new WebSocket('ws://localhost/'),
	setWs:websockettype,
});
//provides the contacts state & the user id state to the rest of the app
export const ContactContext = React.createContext({
	contacts: new Map<string,Contact>(),
	setContacts: contacttype,
	userid: "string",
	setUserId:stringhandlertype,
	resetContactData: () => {},
});
//provide the signal store state & signal id creation to the rest of the app (currently unused)
export const SignalContext = React.createContext({
	userStore: new SignalProtocolStore(),
	createUserIdentity: () => {},
});
