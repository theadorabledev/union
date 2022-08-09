/* A file to hold components used within the main screen */
import React, { useState,useContext,useEffect } from 'react';
import { format, compareAsc } from 'date-fns'
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight,TouchableWithoutFeedback,Modal} from "react-native";
import NavigationBar from 'react-native-navbar';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-material-dropdown-v2'

import * as Contacts from "expo-contacts";

import uuid from 'react-native-uuid';

import {SettingsButton, ProfileButton,SettingProfileButton, ChatComponent} from './Common.js';

import {GlobalStyle} from './Styles.js';



import {ChatContext,ContactContext,SignalContext} from './Context.ts';

const MainScreenStyles = {
    chatComp: {
	flexDirection:'row',
	alignItems:'center',
	padding: 4,
    },
    miniChat: {
	flex: 1,
	flexDirection: 'column',
	height:60,
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
	alignContent: 'space-between',
	paddingTop: 10,
	paddingLeft: 5,
	paddingRight:5,
    },

    userProfileImage: {
	width: GlobalStyle.userProfileSize,
	height: GlobalStyle.userProfileSize,
	resizeMode: 'stretch',
	borderRadius: GlobalStyle.userProfileSize/2,
    },

    userProfileButton: {
	width: GlobalStyle.userProfileSize,
	height:GlobalStyle.userProfileSize,
	borderRadius: GlobalStyle.userProfileSize/2,
	alignItems:'center',
	justifyContent:'center',
    },

    userName: GlobalStyle.textTypes.H3,

    navBar: {
	paddingLeft: 4,
	paddingRight: 4,
    },

    newChat: {
	width: 56,
	height: 56,
	alignItems:'flex-end',
	justifyContent: 'flex-end',
	bottom: 20,
	right: 20,
	position: 'absolute',
    },
};

// A View to Dispay a default message for incoming users
const NoContactsComponent = () => {
    return (
	<View>
	    <Text>It looks like you're all alone.</Text>
	    <Text>Time to Uni/onize!</Text>
	</View>
    );
}

// A component to display either all of someone's chats or the incoming (no contacts) screen
const MessagesListComponent = (props) => {
    const {chats,setChats,ws,setWs} = useContext(ChatContext)
    const {contacts,setContacts,userid,setUserId,resetContactData} = useContext(ContactContext)

    const {userStore,createUserIdentity,serverip} = useContext(SignalContext)
    const display = "Change Account"
    let empty = (chats.size == 0)
	const [showmodal,setShowModal] = useState(false);
	const [selectedchatid,setSelectedChatId] = useState("");
	const [showdebugmenu,setShowDebugMenu] = useState(false);
	const chatarray = [...chats.entries()].sort((a,b)=>{
		const a_messagearray = a[1].messages;
		const b_messagearray = b[1].messages;
		if (a_messagearray.length > 0 && b_messagearray.length > 0){
			return compareAsc(new Date(b_messagearray[b_messagearray.length-1].date),new Date(a_messagearray[a_messagearray.length-1].date));
		}
	})

	let chatComponents = 
	chatarray.map((a)=>{
		//rconsole.log("logging a",a);
		return(
		<ChatComponent
			key={a[0]}
			chatId={a[0]}
			setShowModal={setShowModal}
			setSelectedChatId={setSelectedChatId}
		/>)
	})
    let contactArray = [];
    contacts.forEach((a,i)=>{
		contactArray.push({value: a.id});
    })
	function deleteChat(id){
		setChats((chats)=>{
			const newChats = new Map(chats);
			newChats.delete(id)
			return newChats;
		})}
    return (
	<>
		{
		(showdebugmenu)
		?
		<>
			<Dropdown
			label={display}
			data={contactArray}
			onChangeText= {
				(value,index,data)=>{
				setUserId((userid)=>{
					return value
				})
				}
			}
			/>
			<Button
				title="Reset Websocket"
				color = {GlobalStyle.highlightcolor}
				onPress={()=>{setWs(new WebSocket('ws://'+serverip+'/'+userid))}}
			/>

			<Button
				title="Reset ContactData"
				color = {GlobalStyle.highlightcolor}
				onPress={resetContactData}
			/>
		</>:<></>
		}
	    {empty ?
	     <NoContactsComponent/>
	     :
		 <>
			<Modal
				animationType="slide"
				transparent={true}
				visible={showmodal}
				onRequestClose={() => {
				alert("Modal has been closed.");
				setShowModal(!showmodal);
			}}
			>
				<TouchableWithoutFeedback onPress={() => setShowModal(!showmodal)}>
					<View style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: 22
					}}>
					
						<View style={
							{margin: 20,
							backgroundColor: "white",
							borderRadius: 20,
							padding: 35,
							alignItems: "center",
							shadowColor: "#000",
							shadowOffset: {
							width: 0,
							height: 2
							},
							shadowOpacity: 0.25,
							shadowRadius: 4,
							elevation: 5
						}}>
							<Button title="Delete Chat?" onPress={()=>{
								deleteChat(selectedchatid);
								setShowModal(!showmodal)}
								}/>
						</View>
					
					</View>
				</TouchableWithoutFeedback>
			</Modal>
	     <ScrollView>
		 {chatComponents}
	     </ScrollView>
		 </>
	    }
	</>
    );
}

// Button in the lower right corner which directs users to the NewChatScreen
export const NewChatButton = (props) => {
    const navigation = useNavigation();
    return(
	<TouchableOpacity style = {MainScreenStyles.newChat} onPress={() => navigation.navigate('NewChatScreen')} >
	    <Ionicons name='add-circle' size={56} color={GlobalStyle.pinklightcolor}/>
	</TouchableOpacity>
    );
}

// Displays the main screen, all the chats the user is engaged in
const MainScreenComponent = ({navigation}) => {
	const {contacts,setContacts,userid} = useContext(ContactContext)
    useEffect(() => {
	navigation.setOptions({
	    // Navigate you to the settings page
	    headerRight: () => (
		<SettingsButton onPress={() => navigation.navigate('MainSettings')}/>
	    ),
	    // Display user icon and take you to chat settings page
	    headerLeft: () => (
			<SettingProfileButton/>
	    ),
	});
    }, [navigation]);
    
    return (
	<>
	    <View>
		<MessagesListComponent/>
	    </View>
	    <NewChatButton/>
	</>
    );
};
export default MainScreenComponent;
