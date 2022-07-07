/* A file to hold components used within the chat screen. */
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import {SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';

const defaultprofile = require('./assets/profilepicsquaresmall.png')


const MessageBoxComponent = (props) => {
    const [textmessages,setMessages] = useState([props.messages]);
    let empty = (textmessages.length == 0)
    let textComponents = textmessages.map((a, i) => {
		return <Text key={i}>{a}</Text>;
    });
	
    return (
	<>
	    {empty ? 
	    <Text>No messages</Text>
	     :
	     <ScrollView>
		 {textComponents}
	     </ScrollView>
	    }
	</>
    );	
}




const ChatScreenComponent = ({route, navigation}) => {
	
	const titlename = route.params.username.length > 15 ?  route.params.username.substring(0,14) + "..." : route.params.username
	const chatOptions = [
	{text:"Settings", handler:() => navigation.navigate('ChatSettings')},
	{text:"Search", handler:()=> {alert("Search conversation function")}},
	{text:"Add to friends", handler:()=> {alert("Add contact to friends list")}},
	]
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: titlename,
	    headerRight: () => (
			<View style={{
				flexDirection:'row',
				justifyContent:'space-between',
				alignItems: 'center',
				minWidth: 80,
			}}>
				<SettingsButton onPress={() => navigation.navigate('ChatSettings')}/>
				<PhoneButton username={route.params.username}/>
				<ContextMenu options={chatOptions}ionicon="menu"/>
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
