import React, {Dispatch,useEffect,useState} from 'react';
import {ImageSourcePropType, Button, Text, View} from 'react-native';
import { SignalProtocolStore } from "./storage-type";
import uuid from 'react-native-uuid';
import {
	MessageType,
  } from "@privacyresearch/libsignal-protocol-typescript";


//chat interface
export interface Chat{
	id:string;
	contactids:string[];
	messages:ProcessedChatMessage[];
	name:string;
	picture:ImageSourcePropType;
	details:string;
}
//contact interface
export interface Contact{
	id:string;
	name:string;
	picture:ImageSourcePropType;
	details:string;
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

export function MessageCreator(message:string,senderid:string,chatId:string){
	 
	const messageobj:ProcessedChatMessage = {
		messageId:uuid.v4().toString(),
		message:message,
		senderId:senderid,
		chatId:chatId,
		recieverId:"",
		date:new Date(),
		delivered:true,
	}
	return messageobj;
}
//React.Dispatch instances, used to instantiate the contexts used throughout the app.
const chattype: Dispatch<React.SetStateAction<Map<string, Chat>>> = () =>{};
const contacttype: Dispatch<React.SetStateAction<Map<string, Contact>>> = () =>{};
const processedmessagetype: Dispatch<React.SetStateAction<Map<string, ProcessedChatMessage>>> = () =>{};
const websockettype: React.Dispatch<React.SetStateAction<WebSocket>> = () => {};
const stringhandlertype: React.Dispatch<React.SetStateAction<string>> = () => {};

//provides the chat state & websocket states to the rest of the app
export const ChatContext = React.createContext({
	chats: new Map<string,Chat>(),
	setChats: chattype,
	ws: new WebSocket('ws://localhost/'),
	setWs:websockettype,
	processedmessages: new Map<string,ProcessedChatMessage>(),
	setProcessedMessages:processedmessagetype,
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
	createUserIdentity: async () => {},
	serverip:"string",
});

//poll components
import {Result } from 'react-leaf-polls'

// Persistent data array (typically fetched from the server)
// export const ResData = [
// 	{ id: 0,text: , votes: 0 },
// 	{ id: 1,text: ,votes: 0 },
//   ]

  //
  export function vote(item: Result, results: Result[]) {
	// Here you probably want to manage
	// and return the modified data to the server.
  }