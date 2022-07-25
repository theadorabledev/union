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

const StackNav = createNativeStackNavigator();

import {ChatContext} from './Context.js';

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


var ws = new WebSocket('ws://192.168.1.4:8000/55');
const App = (props) => {
	
	console.log("New Web Socket Connection: ",ws);
	

	
	const [chats,setChats] = useState([]);
	const [recentmessageId,setRecentMessageId] = useState(-1)
	const chatState = {chats,setChats,ws};
	
	ws.onmessage = (e) => {
		let msgData = JSON.parse(e.data);
		console.log("Recieved: ", msgData);
		let chatIndex = ReturnChat(chats,msgData.chatId)
		console.log(chatIndex)
		if(chatIndex != -1){
			setChats((chats) =>{
					const newChats = [...chats]
					newChats[chatIndex].messages.push(msgData)
					console.log(chatIndex)
					return newChats
			})
		}
	};
	
	
    return (
	<NavigationContainer>
		<ChatContext.Provider value={chatState}>
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
		</ChatContext.Provider>
	</NavigationContainer>
    );
}
export {ChatContext};
export default App;
