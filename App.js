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

const App = (props) => {
	var ws = new WebSocket('ws://192.168.1.4:8000/');
	console.log("New Web Socket Connection: ",ws);
	const [chats,setChats] = useState([]);
	const chatState = {chats,setChats};
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
