/* A file to hold components used within the main screen */
import React, { useState,useContext,useEffect } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import {SettingsButton, ProfileButton, ChatComponent} from './Common.js';

import {GlobalStyle} from './Styles.js';

import * as Contacts from "expo-contacts";

import uuid from 'react-native-uuid';

import {ChatContext,ContactContext,SignalContext} from './Context.js';

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

//Placeholder variables for debugging
const userInfo = {
    pic:GlobalStyle.defaultprofile,
    firstName:"User",
    lastName:"Profile",
    identify:"They/Them",
    phone:"(123)456-7890"
}
let userprofilepic = GlobalStyle.defaultprofile;


const userContact = {
	userId: 999,
	[Contacts.Fields.Name]: "User Profile",
	[Contacts.Fields.FirstName]: 'User',
	[Contacts.Fields.LastName]: 'Profile',
	Prounouns:'They/Them',
}


const getUsername = () => {
    return userInfo.firstName+" "+userInfo.lastName;
}

function ContactCreator(name,id){
	return {
	  userId: id,
	  [Contacts.Fields.Name]: name,
	};
}

function MessageCreator(message,senderid,chatId){
	return{
		messageId:uuid.v4(),
		message:message,
		senderId:senderid,
		chatId:chatId,
		date:new Date(),
	}
}






// A View to Dispay a default message for incoming users
const NoContactsComponent = () => {
    return (
	<View>
	    <Text>It looks like you're all alone.</Text>
	    <Text>Time to Uni/onize!</Text>
	</View>
    );
}


id1 = "47769a91-2d07-4580-8828-5913cf821623"
id2 = "1d4070bf-7ada-46bd-8b7c-c8b8e0507dec"

// A component to display either all of someone's chats or the incoming (no contacts) screen
const MessagesListComponent = (props) => {
    const {chats,setChats,ws,setWs} = useContext(ChatContext)
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	
	const {userStore,createUserIdentity} = useContext(SignalContext)
	const display = "Change Account (" + userid + ")"
    let empty = (chats.size == 0)
    let chatComponents = []
	chats.forEach((a, i) => {
		let groupchatname = a.chatname
		if (a.chatname == ""){
			groupchatname = contacts.get(a.contactids[0]).username
		}else{
			groupchatname = a.chatname
		}
		chatComponents.push(<ChatComponent
		   key={a.id}
		   username={groupchatname}
		   messages={a.messages}
		   chatId={a.id}
	       />)
    });
    return (
	<>
	    <Button title={display} color = {GlobalStyle.highlightcolor} onPress={()=>{
			setUserId((userid)=>{
				if(userid == id1){
					setWs(new WebSocket('ws://192.168.1.4:8000/'+id2));
					return id2
				}else{
					setWs(new WebSocket('ws://192.168.1.4:8000/'+id1));
					return id1
				}
			})
		    }
											}/>
	    <Button title="Clear Messages" color = {GlobalStyle.highlightcolor} onPress={()=>{
			setChats(new Map())
		    }
											}/>
											
		
	    <Button title="Signal Test Identity Create" color = {GlobalStyle.highlightcolor} onPress={createUserIdentity}/>		
		
	    {empty ?
	     <NoContactsComponent/>
	     :
	     <ScrollView>
		 {chatComponents}
	     </ScrollView>
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
    useEffect(() => {
	navigation.setOptions({
	    headerRight: () => (
		<SettingsButton onPress={() => navigation.navigate('MainSettings',{userInfo:userInfo})}/>
	    ),
	    headerLeft: () => (
		<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={userprofilepic}/>
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
