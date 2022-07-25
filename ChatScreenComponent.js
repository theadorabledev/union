/* A file to hold components used within the chat screen. */

import React, { useState,useEffect } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Keyboard, TextInput, StyleSheet, Alert } from "react-native";
import NavigationBar from 'react-native-navbar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { HeaderBackButton } from '@react-navigation/elements';
import {SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';
import {returnContact} from './MainScreenComponent.js';
import {GlobalStyle} from './Styles.js';
import { render } from 'react-dom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import uuid from 'react-native-uuid';
//Styles for the chats
const ChatStyles = StyleSheet.create({
    message: {
	flexDirection: 'row',
	marginVertical: moderateScale(7,2)
    },
    send: {
	marginLeft: 20,
    },
    recieve: {
	alignSelf: 'flex-end',
	marginRight: 20
    },
    cloud: {
	maxWidth: moderateScale(250,2),
	paddingHorizontal: moderateScale(10,2),
	paddingTop: moderateScale(5,2),
	paddingBottom: moderateScale(7,2),
	borderRadius: 20
    },
    text: {
	paddingTop: 3,
	fontSize: 17,
	lineHeight: 22
    }
})



//wip, fix this later
function addMessage(messagecontents){
	return {
		messageId:uuid.v4(),
		message:messagecontents,
		senderId:999,
		recieverId:0,
		date:new Date(),
	}
}


// Message bubble which displays the text of a message
// TODO: Add reactions as a state variable.
const MessageBubble = (props) => {
    return(
	<View style={[
		  ChatStyles.message,
		  props.send ? ChatStyles.send : ChatStyles.recieve
	      ]}>
	    <View
		style= {[
		    ChatStyles.cloud,
		    {backgroundColor: props.send ? GlobalStyle.highlightcolor : GlobalStyle.pinklightcolor}
		]}>
		{
			
			props.showname
			?
				<Text
					style={[
					ChatStyles.text,
					{color: props.send ? 'white': 'white'}
					]}
				>
					{props.name}

				</Text>
		    :
		    null
		}{
		    props.text
			?
				<Text
					style={[
					ChatStyles.text,
					{color: props.send ? 'white': 'white'}
					]}
				>
					{props.text}

				</Text>
		    :
		    null
		}

	    </View>

	</View>
    )
}

// Container for the messages, updated with state variable, displays "No messages" if so
const MessageBoxComponent = (props) => {
	backgroundColor : '#e5e5e5'
    const [textmessages,setMessages] = useState(props.messages);
    let empty = (textmessages.length == 0)
    let textComponents = textmessages.map((a, i) => {
	//track the most recent recieverId
	let showname = true
	if ( i > 0) {
		if (a.senderId == textmessages[i-1].senderId){
			showname = false
		}
	}
	let username = returnContact(a.senderId).name
	if (a.senderId ==999){	
	return <MessageBubble
		   send
		   key={i}
		   text = {a.message}
		   showname ={showname}
		   name={username}
	       />;
    }else{
	return <MessageBubble
		   recieve
		   key={i}
		   text = {a.message}
		   showname ={showname}
		   name={username}
	       />;		
	}
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

// Styles for the keyboard
const keyboardStyle = StyleSheet.create({
	outer: {
	flexDirection: 'row',
	margin: 5,
	},
    container: {
	backgroundColor: 'white',
	flexDirection: 'row',
	flex: 1,
	marginRight:10,
	padding: 10,
	borderRadius: 50,
    },
    input: {
	flex: 1,
	marginHorizontal:10,
    },
    status: {
	padding: 10,
	textAlign: "center"
    },
	icon: {
	marginHorizontal: 5,
	}
});

// Displays a keyboard which allows the user to write messages
// TODO: Connect to messaging API
const KeyboardComponent = (props) => {
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
	const [text,setText] = useState('');

    useEffect(() => {
	const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
	    setKeyboardStatus("Keyboard Shown");
	});
	const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
	    setKeyboardStatus("Keyboard Hidden");
	});

	 
	
	 
	return () => {
	    showSubscription.remove();
	    hideSubscription.remove();
	};
    }, []);

	const onPress = () => {
		//console.warn("send", text);
		console.log(text),
					props.chatHandler((chats) =>{
						const newChats = [...chats]
						newChats[props.chatIndex].messages.push(addMessage(text))
						return newChats
					})
					props.updateNav({messages:props.chats[props.chatIndex].messages})
					Keyboard.dismiss
	}
    return (
		<View style ={keyboardStyle.outer}>
			<View style={keyboardStyle.container}> 
			<TextInput
				style={keyboardStyle.input}
				placeholder='Press here…'
				onChangeText={newText=>setText(newText)}
				onSubmitEditing={ a=>{
					console.log(text),
					props.chatHandler((chats) =>{
						const newChats = [...chats]
						newChats[props.chatIndex].messages.push(addMessage(text))
						return newChats
					})
					props.updateNav({messages:props.chats[props.chatIndex].messages})
					Keyboard.dismiss
					}
				}
				multiline
			/>
			<TouchableOpacity onPress={onPress}>
				<Ionicons name='paper-plane' size={24} color={GlobalStyle.pinklightcolor} style={keyboardStyle.icon}/>
			</TouchableOpacity>

		</View>
	</View>
    );
}

const ChatScreenContainerStyle ={
    flex:1,
    flexDirection: "column",
}

// Displays the Chat Screen between two users
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
		// Settings Button
		<View style={{
			  flexDirection:'row',
			  justifyContent:'space-evenly',
			  alignItems: 'center',
			  minWidth: 80,
		      }}>
		    <SettingsButton onPress={() => navigation.navigate('ChatSettings')}/>
		    <ContextMenu options={chatOptions}ionicon="menu"/>
		</View>
	    ),
	    headerLeft:()=>(
		// Back Button
		<View style={{
			  flexDirection:'row',
			  flexWrap: "wrap",
			  justifyContent:'flex-start',
			  alignItems: 'center',
			  minWidth: 30,
			  paddingRight: 5,
		      }}>
		    <HeaderBackButton onPress={()=>{navigation.goBack()}}/>
		    <ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={GlobalStyle.defaultprofile} onPress={()=>{alert("let user change contact's picture")}}/>
		</View>
	    ),
	});
    }, [navigation]);
    const {username, messages,chats,chatHandler,chatIndex} = route.params;
    return (
	<View style={ChatScreenContainerStyle}>
	    <MessageBoxComponent messages={messages}/>
	    <KeyboardComponent chatHandler={chatHandler}chats={chats}chatIndex={chatIndex} updateNav={navigation.setParams}/>
	</View>
    );

}

export default ChatScreenComponent;
