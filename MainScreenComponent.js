/* A file to hold components used within the main screen */
import React, { useState,useContext } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import NavigationBar from 'react-native-navbar';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import {SettingsButton, ProfileButton, ChatComponent} from './Common.js';

import {GlobalStyle} from './Styles.js';

import * as Contacts from "expo-contacts";

import uuid from 'react-native-uuid';

import {ChatContext,ContactContext} from './Context.js';

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


const contactList = [
	ContactCreator("The Fool",0),
	ContactCreator("The Magician",1),
	ContactCreator("The High Priestess",2),
	ContactCreator("The Empress",3),
	ContactCreator("The Emperor",4),
	ContactCreator("The Hierophant",5),
	ContactCreator("The Lovers",6),
	ContactCreator("The Chariot",7),
	ContactCreator("Strength",8),
	ContactCreator("The Hermit",9),
	ContactCreator("The Wheel of Fortune",10),
	userContact
]

export function returnContact(id){
	let myContact= contactList.find(function(contact){
		return contact.userId === id;	
	});
	return myContact
}





const originalmessagesold=[
    {ids:[0], messages:[
	"Test Message 0. Lorem Ipsum",
	"Test Message 1. Lorem Ipsum",
	"Test Message 2. Lorem Ipsum",
	"Test Message 3. Lorem Ipsum",
	"Test Message 4. Lorem Ipsum",
	"Test Message 5. Lorem Ipsum",
	"Test Message 6. Lorem Ipsum",
	"Test Message 7. Lorem Ipsum",
	"Test Message 1. Lorem Ipsum",
	"Test Message 2. Lorem Ipsum",
	"Test Message 3. Lorem Ipsum",
	"Test Message 4. Lorem Ipsum",
	"Test Message 5. Lorem Ipsum",
	"Test Message 6. Lorem Ipsum",
	"Test Message 7. Lorem Ipsum",]},
    {id:1,username:"The Magician", messages:["Test Message 0. Lorem Ipsum"]},
    {id:2,username:"The High Priestess", messages:["Test Message 0. Lorem Ipsum"]},
    {id:3,username:"The Empress", messages:["Test Message 0. Lorem Ipsum"]},
    {id:4,username:"The Emperor", messages:["Test Message 0. Lorem Ipsum"]},
    {id:5,username:"The Hierophant", messages:["Test Message 0. Lorem Ipsum"]},
    {id:6,username:"The Lovers", messages:["Test Message 0. Lorem Ipsum"]},
    {id:7,username:"The Chariot", messages:["Test Message 0. Lorem Ipsum"]},
    {id:8,username:"Strength", messages:["Test Message 0. Lorem Ipsum"]},
    {id:9,username:"The Hermit", messages:["Test Message 0. Lorem Ipsum"]},
    {id:10,username:"The Wheel of Fortune", messages:["Test Message 0. Lorem Ipsum"]},
]



const originalchats=[
    {chatId:0,ids:[0], chatName:"", messages:[
		MessageCreator("Test Message 0. Lorem Ipsum",0,0),
		MessageCreator("Test Message 1. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",0),
		MessageCreator("Test Message 0. Lorem Ipsum",0,0),
		MessageCreator("Test Message 2. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",0),
		MessageCreator("Test Message 0. Lorem Ipsum",0,0),
		MessageCreator("Test Message 0. Lorem Ipsum",0,0),
		MessageCreator("Test Message 3. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",0),
		MessageCreator("Test Message 0. Lorem Ipsum",0,0),
	]},
    {chatId:1,ids:[1,2], chatName:"Test Group chat", messages:[
		MessageCreator("Test Message 0. Lorem Ipsum",1,1),
		MessageCreator("Test Message 1. Lorem Ipsum",4,1),
		MessageCreator("Test Message 2. Lorem Ipsum","47769a91-2d07-4580-8828-5913cf821623","TestUser",1),
	]},
]




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
	const display = "Change Account (" + userid + ")"
    let empty = (chats.length == 0)
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
					return id2
				}else{
					return id1
				}
			})
			setWs(new WebSocket('ws://192.168.1.4:8000/'+userid));
		    }
											}/>
	    <Button title="Clear Messages" color = {GlobalStyle.highlightcolor} onPress={()=>{
			setChats(new Map())
		    }
											}/>
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
    React.useLayoutEffect(() => {
	navigation.setOptions({
	    title: getUsername(),
	    headerRight: () => (
		<SettingsButton onPress={() => navigation.navigate('MainSettings',{userInfo:userInfo, profilepic:userprofilepic})}/>
	    ),
	    headerLeft: () => (
		<ProfileButton profileSize={GlobalStyle.userProfileSize} profileSource={userprofilepic} onPress={()=>{alert("let user change profile picture")}}/>
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
