/* A file to hold components used within the chat screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {SettingsButton,PhoneButton,ProfileButton} from './Common.js';

const defaultprofile = require('./assets/profilepicsquaresmall.png')


const MessageBoxComponent = (props) => {
    const [textmessages,setMessages] = useState([props.messages]);
    let empty = (textmessages.length == 0)
    let textComponents = textmessages.map((a, i) => {
	return <Text>
	{a}
	       </Text>;
    });
    return (
	<>
	    {empty ? 
	    <Text>No new messages</Text>
	     :
	     <ScrollView>
		 {textComponents}
	     </ScrollView>
	    }
	</>
    );	
}


// Returns the settings screen displayed on the main page
const ChatScreenComponent = ({route, navigation}) => {
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: route.params.username,
	    headerRight: () => (
		<View style={{
			flexDirection:'row',
			justifyContent:'flex-end',
			alignItems: 'center',
			minWidth: 30,
		}}>
			<SettingsButton onPress={() => navigation.navigate('ChatSettings')}/>
			<PhoneButton username={route.params.username}/>
			<Ionicons name="ellipsis-vertical" size={24} color="black" />
		</View>
		
	    ),
		headerLeft:()=>(
		<View style={{
			flexDirection:'row',
			flexWrap: "wrap",
			justifyContent:'flex-start',
			alignItems: 'center',
			minWidth: 30,
			paddingRight: 10,
		}}>
			<HeaderBackButton onPress={()=>{navigation.goBack()}}/>
			<ProfileButton profileSize={32} profileSource={defaultprofile} onPress={()=>{alert("let user change contact's picture")}}/>
		</View>
			),
	});
    }, [navigation]);
    const {username, messages} = route.params;
    return (
	    <MessageBoxComponent messages={messages}/>
    );
}

export default ChatScreenComponent;
