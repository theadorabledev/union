/* A Screen to hold components used to display chat messages. */
import React, { useState,useEffect,useContext,useRef} from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Keyboard, TextInput, StyleSheet, Alert } from "react-native";
import NavigationBar from 'react-native-navbar';
import { render } from 'react-dom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';

import Ionicons from '@expo/vector-icons/Ionicons';

import {SettingsButton,PhoneButton,ProfileButton,ContextMenu} from './Common.js';
import {ChatContext,ContactContext,MessageCreator} from './Context';
import {GlobalStyle} from './Styles.js';
import Modal from "react-native-modal";





//Styles for the chats
const ChatStyles = StyleSheet.create(
	{
		message: 
		{
			flexDirection: 'row',
			marginVertical: moderateScale(7,2)
    	},
		send: 
		{
			marginLeft: 20,
		},
		recieve: 
		{
			alignSelf: 'flex-end',
			marginRight: 20
		},
		cloud: 
		{
			maxWidth: moderateScale(250,2),
			paddingHorizontal: moderateScale(10,2),
			paddingTop: moderateScale(5,2),
			paddingBottom: moderateScale(7,2),
			borderRadius: 20
		},
		text: 
		{
			paddingTop: 3,
			fontSize: 17,
			lineHeight: 22
		}
	}
)


// Message bubble which displays the text of a message
const MessageBubble = (props) => {
    return(
		<View style=
		{[
		  ChatStyles.message,
		  props.send ? ChatStyles.send : ChatStyles.recieve
		]}>
			<View style=
			{[
				ChatStyles.cloud,
				{backgroundColor: props.send ? GlobalStyle.highlightcolor : GlobalStyle.pinklightcolor}
			]}>
				{
					props.showname
					?
						<Text style=
						{[
							ChatStyles.text,
							{color: props.send ? 'white': 'white'}
						]}>
							{props.name}
						</Text>
					:
						null
				}

				{
					props.text
					?
						<Text style=
						{[
							ChatStyles.text,
							{color: props.send ? 'white': 'white'}
						]}>
							{props.text}
						</Text>
					:
						null
				}
	    	</View>
		</View>
    )
}

// Container for the messages, updated with state variable, displays "No messages" if chat message array is empty.
const MessageBoxComponent = (props) => {

	const {chats,setChats} = useContext(ChatContext)
	const {contacts,setContacts,userid} = useContext(ContactContext)
	//get value to determine if chat is currently empty
    let empty = (chats.get(props.chatId).messages.length == 0)
	//get scroll view reference to allow for autoscrolling the scrollview
	const scrollViewRef = useRef();
	//create message bubble components
    let textComponents = chats.get(props.chatId).messages.map((a, i) => 
	{
		//check if consecutive messages are being displayed and hide the sender name if so.
		let showname = true;
		if ( i > 0) {
			if (a.senderId == chats.get(props.chatId).messages[i-1].senderId){
				showname = false
			}
		}
		//retrieve contact username 
		let username = contacts.get(a.senderId).name
		//choose between send & recieve variations depending on sender id & user id comparison
		if (a.senderId ==userid)
		{	
			return <MessageBubble
					send
					key={i}
					text = {a.message}
					showname ={showname}
					name={username}
				/>;
		}
		else
		{
			return <MessageBubble
					recieve
					key={i}
					text = {a.message}
					showname ={showname}
					name={username}
				/>;		
		}
	});
	//need fragment for ternary comparison
    return (
		<>
			{
				empty 
				?
					<ScrollView
						ref={scrollViewRef}
						onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
					>
						<Text>No messages</Text>
					</ScrollView>
				:
					<ScrollView
						ref={scrollViewRef}
						onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
					>
						{textComponents}
					</ScrollView>
			}
		</>
    );
}

// Styles for the keyboard
const keyboardStyle = StyleSheet.create(
	{
		outer:
		{
			flexDirection: 'row',
			margin: 5,
		},
		container:
		{
			backgroundColor: 'white',
			flexDirection: 'row',
			flex: 1,
			marginRight:10,
			padding: 10,
			borderRadius: 50,
		},
		input:{
			flex: 1,
			marginHorizontal:10,
		},
		status:
		{
			padding: 10,
			textAlign: "center"
		},
		icon:
		{
			marginHorizontal: 5,
		}
	}
);

// Displays a keyboard which allows the user to write messages
// TODO: Connect to messaging API
const KeyboardComponent = (props) => {
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
	const {chats,setChats,ws} = useContext(ChatContext)
	const {contacts,setContacts,userid} = useContext(ContactContext)
	const [text,setText] = useState('');
	const [isModalVisible, setModalVisible] = useState(false); //modal show
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	  };
	//auto hide/show keyboard 
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
	//sends message with use of send button
	const onPress = () => 
	{
		//console.warn("send", text);
		const trimtext = text.trim();
		console.log(trimtext)
		//create a message object corresponding to the contents of the keyboard, push it to the chat, then send it to each member of the chat that isn't the device user.
		if (trimtext != ""){
			setChats((chats) =>
			{
				const newChats = new Map(chats);
				const thischat = newChats.get(props.chatId)
				const message = MessageCreator(trimtext,userid,props.chatId)
				thischat.messages.push(message)
				thischat.contactids.forEach((currentValue, index, arr)=>
				{
					if (arr[index]!=userid)
					{
						message.recieverId=arr[index]
						ws.send(JSON.stringify(message))
					}
				})
				newChats.set(props.chatId,thischat)
				return newChats;
			})
		}
		Keyboard.dismiss();
		setText("");
	}
    return (
		<View style ={keyboardStyle.outer}>
			<Button title="P" onPress={toggleModal} />
			<Modal 
			isVisible={isModalVisible} 
			backdropColor={"pink"} 
			backdropOpacity={.35}
			onBackdropPress={() => setModalVisible(false)}
			//onModalWillShow = {function} on show will construct the poll with text data
			>
        		<View style={{ flex: 1 }}>
          			<Text>Poll will go here</Text>

          			<Button title="Hide modal" onPress={toggleModal} />
        		</View>
      		</Modal>
			<View style={keyboardStyle.container}> 
			<TextInput
				style={keyboardStyle.input}
				placeholder='Press here…'
				onChangeText={newText=>setText(newText)}
				value={text}
				multiline
			/>
			<TouchableOpacity onPress={onPress}>
				<Ionicons name='paper-plane' size={24} color={GlobalStyle.highlightcolor} style={keyboardStyle.icon}/>
			</TouchableOpacity>

		</View>
	</View>
    );
}

// Displays the Chat Screen between two users
const ChatScreenComponent = ({route, navigation}) => {

    const titlename = route.params.username.length > 14 ?  route.params.username.substring(0,13) + "..." : route.params.username
    const chatOptions = [
	{text:"Settings", handler:() => navigation.navigate('ChatSettings')},
	{text:"Search", handler:()=> {alert("Search conversation function")}},
	{text:"Add to friends", handler:()=> {alert("Add contact to friends list")}},
    ]
	const {chatId,chatpic,settingsNavigate} = route.params;
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
					<SettingsButton onPress={settingsNavigate}/>
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
					<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={chatpic} onPress={()=>{settingsNavigate}}/>
				</View>
			),
		});
    }, [navigation]);
    return (
		<View style={{flex:1,flexDirection: "column"}}>
			<MessageBoxComponent chatId={chatId}/>
			<KeyboardComponent chatId={chatId}/>
		</View>
    );
}

export default ChatScreenComponent;
