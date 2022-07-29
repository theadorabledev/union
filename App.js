import 'react-native-gesture-handler'; 
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";

import MainScreenComponent from './MainScreenComponent';
import MainSettingScreenComponent from './MainSettingScreenComponent';
import ChatScreenComponent from './ChatScreenComponent';
import ChatSettingScreenComponent from './ChatSettingScreenComponent';
import NewChatScreenComponent from './NewChatScreenComponent';
import SettingOptionsComponent from './SettingOptionsComponent'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getHeaderTitle } from '@react-navigation/elements';
import { withNavigation } from 'react-navigation';

import Ionicons from '@expo/vector-icons/Ionicons';
import uuid from 'react-native-uuid';
const StackNav = createNativeStackNavigator();

import {ChatContext,ContactContext,TestingContext} from './Context.js';

function ReturnChat(chats,id){
	let myChatData= chats.findIndex(function(chat){
		return chat.chatId === id;
	});
	return myChatData;
}


//setChats((chats) =>{
//	const newChats = [...chats]
//	newChats[props.chatIndex].messages.push(addMessage(text))
//	return newChats
//})


function ContactCreator(map,id,username,profilepic,prounouns){
	map.set(id,{id,username,profilepic,prounouns})
}

function TestChatCreator(map,id,contactids,messages,chatname,chatpic,description){
	map.set(id,{id,contactids,messages,chatname,chatpic,description})
}

function MessageCreator(message,senderid,chatId){
	return{
		messageId:uuid.v4(),
		message:message,
		senderId:senderid,
		chatId:chatId,
		recieverId:0,
		date:new Date(),
	}
}

const contactMap = new Map();

const chatMap = new Map();

const initialUserId = "47769a91-2d07-4580-8828-5913cf821623";
const altId = "1d4070bf-7ada-46bd-8b7c-c8b8e0507dec"
ContactCreator(contactMap,initialUserId,"TestUser",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,altId,"The Fool",require('./assets/profilepicsquaresmall.png'),"They/Them")
ContactCreator(contactMap,1,"The Magician",require('./assets/profilepicsquaresmall.png'),"They/Them")
ContactCreator(contactMap,2,"The High Priestess",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,3,"The Empress",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,4,"The Emperor",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,5,"The Hierophant",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,6,"The Lovers",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,7,"The Chariot",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,8,"Strength",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,9,"The Hermit",'./assets/profilepicsquaresmall.png',"They/Them")
ContactCreator(contactMap,10,"The Wheel of Fortune",'./assets/profilepicsquaresmall.png',"They/Them")

TestChatCreator(chatMap,0,[initialUserId,altId],[
		MessageCreator("Test Message 0. Lorem Ipsum",altId,0),
		MessageCreator("Test Message 1. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",0),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,0),
		MessageCreator("Test Message 2. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",0),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,0),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,0),
		MessageCreator("Test Message 3. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",0),
		MessageCreator("Test Message 0. Lorem Ipsum",altId,0),
	],"",require('./assets/profilepicsquaresmall.png'),"")
TestChatCreator(chatMap,1,[1,4], [
		MessageCreator("Test Message 0. Lorem Ipsum",1,1),
		MessageCreator("Test Message 1. Lorem Ipsum",4,1),
		MessageCreator("Test Message 2. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",1),
	],"Test Group chat", require('./assets/profilepicsquaresmall.png'),"A test Chat")


initialws = new WebSocket('ws://192.168.1.4:8000/'+initialUserId)
const App = (props) => {
	console.log("New Web Socket Connection: ",ws);
	const [contacts,setContacts] = useState(contactMap);
	const [ws,setWs] = useState(initialws)
	const [chats,setChats] = useState(new Map(chatMap));
	const [userid,setUserId] = useState(initialUserId);
	const chatState = {chats,setChats,ws,setWs};
	const contactState = {contacts,setContacts,userid,setUserId};
	

	ws.onmessage = (e) => {
		let msgData = JSON.parse(e.data);
		console.log("Recieved: ", msgData);
		let chatId = msgData.chatId
		console.log(chatId)
		setChats((chats) =>{
			const newChats = new Map(chats);
			const thischat = newChats.get(chatId)
			thischat.messages.push(msgData)
			newChats.set(chatId,thischat)
			return newChats;
		})
	};
	
	
    return (
	<NavigationContainer>
		<ChatContext.Provider value={chatState}>
				<ContactContext.Provider value={contactState}>
					<StackNav.Navigator>
						<StackNav.Screen 
							name="Home"
							component={MainScreenComponent} 
						/>
						<StackNav.Screen 
							name="MainSettings"
							component={MainSettingScreenComponent}
						/>
						<StackNav.Screen 
							name="ChatScreen"
							component={ChatScreenComponent}
							options={({ route }) => ({ title: route.params.username })}
						/>
						<StackNav.Screen 
							name="ChatSettings"
							component={ChatSettingScreenComponent}
						/>
						<StackNav.Screen 
							name="NewChatScreen"
							component={NewChatScreenComponent}
						/>
						<StackNav.Screen 
							name="SettingOptions"
							component={SettingOptionsComponent}
						/>
					</StackNav.Navigator>
				</ContactContext.Provider>
		</ChatContext.Provider>
	</NavigationContainer>
    );
}





export {ChatContext};
export default App;
