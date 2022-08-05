/*
  A file to hold components shared across different pages and library pre-reqs shared by components.
*/

import React, { useState,useContext } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import Ionicons from '@expo/vector-icons/Ionicons';
import {FontAwesome} from '@expo/vector-icons';

import {GlobalStyle} from './Styles.js';
import {ChatContext,ContactContext,SignalContext} from './Context.ts';

// Home button to navigate to MainScreenComponent
export const HomeButton = ({onPress}) => {
    return(
	<TouchableOpacity onPress={()=>onPress()}>
	    <Ionicons name="home" size={GlobalStyle.iconSize} color={GlobalStyle.pinklightcolor} />
	</TouchableOpacity>
    )
}

// User icon
export const UserButton = ({onPress}) => {
    return(
	<TouchableOpacity onPress={()=>onPress()} >
	    <FontAwesome name="user" size={GlobalStyle.userProfileSize} color="black" />
	</TouchableOpacity>
    );
}

//Settings icon which triggers menu popup
export const SettingsButton = ({onPress}) => {
    return(
	<TouchableOpacity onPress={()=>onPress()} >
	    <Ionicons name='settings-outline' size={GlobalStyle.iconSize} color={GlobalStyle.highlightcolor}/>
	</TouchableOpacity>
    );
}


//call button (should this really be common?)
export const PhoneButton = (props) => {
    return(
	<TouchableOpacity onPress={()=>{alert("Calling " + props.username)}} >
	    <FontAwesome name="phone" size={GlobalStyle.iconSize} color="black" />
	</TouchableOpacity>
    );
}


//Image Button Wrapper
export const ProfileButton = (props) => {
	return(
		<TouchableHighlight style ={{width: props.profileSize, height: props.profileSize, borderRadius: props.profileSize/2}}
			onPress={props.onPress}>
			<Image
				style ={{width: props.profileSize, height: props.profileSize, borderRadius: props.profileSize/2}}
				source={props.profileSource}
			/>
		</TouchableHighlight>
    );
}


export const SettingProfileButton = (props) => {
	const {contacts,setContacts,userid} = useContext(ContactContext);
	const navigation = useNavigation();
    return(
		<ProfileButton
				profileSize={GlobalStyle.userProfileSize}
				profileSource={contacts.get(userid).profilepic}
				onPress={() => navigation.navigate('ChatSettings', {
				id:userid,
				ischat:false,
				})}
			/>
	)
}

//context menu wrapper
export const ContextMenu =(props)=> {
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const menuOptions = props.options.map((a,i) => {
	return <MenuItem key={i} onPress={a.handler}>{a.text}</MenuItem>
    });

    return (
	<View>
	    <Menu
		visible={visible}
		anchor={<Ionicons name={props.ionicon} size={GlobalStyle.iconSize} onPress={showMenu} color={GlobalStyle.highlightcolor} />}
		onRequestClose={hideMenu}
	    >
		{menuOptions}
	    </Menu>
	</View>
    );
}

// Component to display a chat log with a user, with the most recent message previewed
// Used on main page and new chat page


//retrieve dynamically determined name from chat object, corresponding to either chat name, or name of contact if DM.
//not alphabetized correctly?
function getChatName(chat){
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	if (chat.chatname != ""){
		return chat.chatname;
	}
	else{
		const filteredcontacts = chat.contactids.filter((a)=>{
			return a!= userid;
		});
		const contactnames = filteredcontacts.map((a)=>{
				const contact = contacts.get(a);
				if(typeof contact != "undefined"){
					return contacts.get(a).username;
				}
		})

		contactnames.sort(function (a, b) {
			return a.length - b.length;
		});
		//console.log(contactnames);
		if(contactnames.length > 1){
			return contactnames.toString();
		}else if(contactnames.length>0){
			return contactnames[0];
		}else{
			return "name not found";
		}
	}
}

//retrieve dynamically determined name from chat object, corresponding to either chat picture, or contact profile picture if DM.
function getChatPicture(chat){
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	let chatpic = chat.chatpic;
	if(chat.contactids.length==2){
		let contactnames = chat.contactids.map((a)=>{
			if (a!= userid){
				const contact = contacts.get(a);
				if(typeof contact != "undefined"){
					chatpic = contacts.get(a).profilepic;
				}
			}
		});
	}
	//log(chatpic);
	return chatpic;
}

//Chat Component Styling, used for chat component & new chat component
const ChatComponentStyles = {
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
    userName: GlobalStyle.textTypes.H3
}


//chat component: Displays information related to chat in main screen component, as well as providing navigation options to corresponding screens
export const ChatComponent = (props) => {
    const navigation = useNavigation();
	const {chats,setChats,ws,setWs} = useContext(ChatContext)
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	const chat = chats.get(props.chatId)
	const chatname = getChatName(chat)
	const chatpic = getChatPicture(chat)
	//provides navigation options to contact settings if DM, or chat settings if GC.
	const settingsNavigate =() => {
		if(chat.contactids.length != 2){
			navigation.navigate('ChatSettings', 
			{
				id:props.chatId,
				ischat:true,
			})
		}
		else{
			const dmid = chat.contactids.find((contactid)=>{
				return contactid != userid;
			});
			navigation.navigate('ChatSettings', 
			{
				id:dmid,
				ischat:false,
			})
		}
	}
	//return JSX object that displays contents & time of last message
    const lastMessage = () => {
		if(chat.messages.length){
			return (
			<>
				<Text>{chat.messages[chat.messages.length-1].message}</Text>
				<Text>{chat.messages[chat.messages.length-1].date.toString()}</Text>
			</>
			);
		}
    }
    return (
		<TouchableHighlight onPress={() =>
			navigation.navigate('ChatScreen', 
			{
				username:chatname,
				messages:chat.messages,
				newChat:props.isNewChat,
				chatId:props.chatId,
				chatpic:chatpic,
				settingsNavigate:settingsNavigate,
			})
		}
		underlayColor = {GlobalStyle.highlightcolor}>
			<View style={ChatComponentStyles.chatComp}>
				<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={chatpic} onPress={settingsNavigate}/>
				<View style={ChatComponentStyles.miniChat}>
					<Text style={ChatComponentStyles.userName}>{chatname}</Text>
					{lastMessage()}
				</View>
			</View>
		</TouchableHighlight>
    );
};


//used to create new contact object (needs to be replaced with typescript compatable format)
function ContactCreator(id,username,profilepic,pronouns){
	return{id,username,profilepic,pronouns};
}
//used to create new chat object (needs to be replaced with typescript compatable format)
function ChatCreator(id,contactids,messages,chatname,chatpic,description){
	return {id,contactids,messages,chatname,chatpic,description};
}

//Displays devices contact data with options to create new contact & chat if user presses
//pass props.username, props.uri 
export const NewChatComponent = (props) => {
    const navigation = useNavigation();
	const {chats,setChats,ws,setWs} = useContext(ChatContext)
	const {contacts,setContacts,userid,setUserId} = useContext(ContactContext)
	//display either device's contact's image if present, or default icon if not present.
	const getImage = () =>{
		if (typeof props.image == "undefined"){
			return GlobalStyle.defaultprofile;
		}else{
			return props.image;
		}
	} 
	//take the devices contact info, generate new contact data & chat data based on it, and navigate to the new chat.
	function newContactChat(){
		console.log("Create Contact");
		//create new contact id
		const newcontactid = uuid.v4();
		//add user to contact map
		setContacts((contacts) =>{
			const newContacts = new Map(contacts);
			const thiscontact = ContactCreator(newcontactid,props.username,getImage(),"They/Them");
			newContacts.set(newcontactid,thiscontact)
			return newContacts;
		});
		//generate new chat
		const newchatid = uuid.v4();
		//this should send information to the server to generate the actual chat and make sure the uuid's match between users, but one thing at a time.
		const getnewchat =ChatCreator(newchatid,[userid,newcontactid],[],"",GlobalStyle.defaultprofile,"");
		setChats((chats) => {
			const newChats = new Map(chats);
			newChats.set(newchatid,getnewchat);
			return newChats;
		});
		//navigate to new chat screen
		navigation.navigate('Home');
	}
    return (
	<TouchableHighlight 
		onPress={newContactChat}
			    underlayColor = {GlobalStyle.highlightcolor}>
	    <View style={ChatComponentStyles.chatComp}>
			<ProfileButton profileSize={GlobalStyle.contactProfileSize} profileSource={getImage()} onPress={()=>{alert("Take user to contact's settings")}}/>
			<View style={ChatComponentStyles.miniChat}>
				<Text style={ChatComponentStyles.userName}>{props.username}</Text>
			</View>
	    </View>
	</TouchableHighlight>
    );
};
